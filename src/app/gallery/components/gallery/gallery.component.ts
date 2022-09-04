import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GiphyService} from 'src/app/services/giphy.service';
import {Gyphy, GyphyType} from 'src/app/interfaces/gyphy';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, Observable, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  typeCases: GyphyType[] = ['gifs', 'stickers'];

  gyphyData$?: Observable<Gyphy>;

  gyphyGroup!: FormGroup;

  loading = false;

  constructor(
    private giphyService: GiphyService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.onFormChanges();
  }

  updateSearch(value: string): void {
    this.gyphyGroup.get('search')!.setValue(value);
  }

  updateType(value: string): void {
    this.gyphyGroup.get('type')!.setValue(value);
  }

  updatePage(page: number): void {
    this.gyphyGroup.get('page')!.setValue(page);
  }

  private createForm(): void {
    this.gyphyGroup = this.fb.group({
      search: '',
      type: '',
      page: 1
    })
  }

  private onFormChanges(): void {
    this.gyphyData$ = this.gyphyGroup.valueChanges
      .pipe(
        tap(_ => this.loading = true),
        filter(({search, type}) => search.length && type),
        debounceTime(200),
        distinctUntilChanged((prev, curr) => {
          this.loading = JSON.stringify(prev) !== JSON.stringify(curr);
          return JSON.stringify(prev) === JSON.stringify(curr);
        }),
        switchMap(({search, type, page}) => this.getData(search, type, page)),
        tap(_ => this.loading = false),
      )
  }

  private getData(search: string, type: GyphyType, page: number): Observable<Gyphy> {
    return this.giphyService.getImages(search, type, page)
  }
}
