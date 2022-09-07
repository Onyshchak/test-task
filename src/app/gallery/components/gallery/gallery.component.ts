import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';
import { Gyphy, GyphyType } from 'src/app/interfaces/gyphy';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
	@Input() public typeCases: GyphyType[] = ['gifs', 'stickers'];

	@Input() public isLoading = false;

	public gyphyData$?: Observable<Gyphy>;

	public gyphyGroup!: FormGroup;

	private limit = environment.giphyAPI.limit;

	private imageStorage: Gyphy = { count: 0, gyphyItems: [] };

	constructor(private giphyService: GiphyService, private fb: FormBuilder) {}

	ngOnInit(): void {
		this.createForm();
		this.onFormChanges();
	}

	updatePage(page: number): void {
		this.gyphyGroup.get('page')!.setValue(page);
	}

	changeSearch(chips: string[]): void {
		this.gyphyGroup.get('search')!.setValue(chips.join(' '));
	}

	private createForm(): void {
		this.gyphyGroup = this.fb.group({
			search: '',
			type: '',
			page: 1
		});
	}

	private onFormChanges(): void {
		this.gyphyData$ = this.gyphyGroup.valueChanges.pipe(
			filter(({ search, type }) => search.length && type),
			distinctUntilChanged((prev, curr) => this.skipChanges(prev, curr)),
			switchMap((form) => {
				const page = this.imageStorage?.gyphyItems.length ? form.page : 1;
				return this.getData(form.search, form.type, page).pipe(
					map((data) => {
						this.imageStorage = {
							count: data.count,
							gyphyItems: [...this.imageStorage.gyphyItems, ...data.gyphyItems]
						};
						return this.imageStorage;
					})
				);
			}),
			tap(() => {
				this.isLoading = false;
			})
		);
	}

	get showImages(): boolean {
		return this.gyphyGroup.get('search')?.value && this.gyphyGroup.get('type')?.value;
	}

	get start(): number {
		return (this.gyphyGroup.get('page')?.value - 1) * this.limit;
	}

	get end(): number {
		return this.gyphyGroup.get('page')?.value * this.limit;
	}

	private resetPage(): void {
		this.gyphyGroup.get('page')?.setValue(1, { emitEvent: false });
	}

	private resetImageStorage(): void {
		this.imageStorage = { count: 0, gyphyItems: [] };
	}

	private getData(search: string, type: GyphyType, page: number): Observable<Gyphy> {
		this.isLoading = true;
		return this.giphyService.getImages(search, type, page);
	}

	private skipChanges(prev: any, curr: any): boolean {
		const typeChanged = !prev.type || prev.type !== curr.type;
		const searchChanged = !prev.search || prev.search !== curr.search;
		const isOnlyPageChanged = prev.search === curr.search && prev.type === curr.type;
		if (typeChanged || searchChanged) {
			this.resetImageStorage();
			this.resetPage();
		}
		const isInStorage = this.imageStorage?.gyphyItems.length >= curr.page * this.limit;
		return isOnlyPageChanged && isInStorage;
	}
}
