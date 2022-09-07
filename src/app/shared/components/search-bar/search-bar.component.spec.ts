import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { ControlContainer } from '@angular/forms';

describe('SearchBarComponent', () => {
	let component: SearchBarComponent;
	let fixture: ComponentFixture<SearchBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchBarComponent],
			providers: [ControlContainer]
		}).compileComponents();

		fixture = TestBed.createComponent(SearchBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
