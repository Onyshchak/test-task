import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('GalleryComponent', () => {
	let component: GalleryComponent;
	let fixture: ComponentFixture<GalleryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GalleryComponent],
			imports: [
				FormsModule,
				ReactiveFormsModule,
				BrowserDynamicTestingModule,
				HttpClientTestingModule,
				BrowserAnimationsModule
			]
		}).compileComponents();

		fixture = TestBed.createComponent(GalleryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.gyphyGroup.patchValue({
			search: 'some search',
			type: 'some type',
			page: 5
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return start index of cutting array', () => {
		const limit = environment.giphyAPI.limit;
		expect(component.start).toBe(limit * (component.gyphyGroup.get('page')!.value - 1));
	});

	it('should return end index of cutting array', () => {
		const limit = environment.giphyAPI.limit;
		expect(component.end).toBe(limit * component.gyphyGroup.get('page')!.value);
	});

	it('should test boolean showImages', () => {
		expect(component.showImages).toEqual(
			component.gyphyGroup.get('search')!.value && component.gyphyGroup.get('type')!.value
		);
	});

	it('should change search control', () => {
		component.changeSearch(['first', 'second']);
		expect(component.gyphyGroup.get('search')!.value).toBe('first second');
	});

	it('should update page control', () => {
		component.updatePage(5);
		expect(component.gyphyGroup.get('page')!.value).toBe(5);
	});
});
