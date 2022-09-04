import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';
import { Gyphy, GyphyType } from 'src/app/interfaces/gyphy';
import { FormBuilder, FormGroup } from '@angular/forms';
import { concatMap, distinctUntilChanged, filter, map, Observable, pairwise, startWith, tap } from 'rxjs';
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

	updateSearch(value: string): void {
		this.resetPage(false);
		this.imageStorage = { count: 0, gyphyItems: [] };
		this.gyphyGroup.get('search')!.setValue(value);
	}

	updateType(value: string): void {
		this.resetPage(false);
		this.imageStorage = { count: 0, gyphyItems: [] };
		this.gyphyGroup.get('type')!.setValue(value);
	}

	updatePage(page: number): void {
		const needEmmitEvent = this.imageStorage?.gyphyItems.length < page * this.limit;
		this.gyphyGroup.get('page')!.setValue(page, { emitEvent: needEmmitEvent });
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
			distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
			filter(({ search, type }) => {
				if (!search.length || !type) {
					this.resetPage(false);
				}
				return search.length && type;
			}),
			startWith(this.gyphyGroup.value),
			pairwise(),
			concatMap(([prev, curr]) => {
				const isOnlyPageChanged = prev.search === curr.search && prev.type === curr.type;
				if (!isOnlyPageChanged) {
					this.resetPage(false);
					return this.getData(curr.search, curr.type, curr.page).pipe(tap((data) => (this.imageStorage = data)));
				}
				return this.getData(curr.search, curr.type, curr.page).pipe(
					map((data) => {
						this.imageStorage = {
							count: data.count,
							gyphyItems: [...this.imageStorage.gyphyItems, ...data.gyphyItems]
						};
						return this.imageStorage;
					})
				);
			}),
			tap((_) => {
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

	private resetPage(isEmitted = true): void {
		this.imageStorage = { count: 0, gyphyItems: [] };
		this.gyphyGroup.get('page')?.setValue(1, { emitEvent: isEmitted });
	}

	private getData(search: string, type: GyphyType, page: number): Observable<Gyphy> {
		this.isLoading = true;
		return this.giphyService.getImages(search, type, page);
	}
}
