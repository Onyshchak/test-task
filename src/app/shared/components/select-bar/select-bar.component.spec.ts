import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBarComponent } from './select-bar.component';
import { ControlContainer } from '@angular/forms';

describe('SelectBarComponent', () => {
	let component: SelectBarComponent;
	let fixture: ComponentFixture<SelectBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectBarComponent],
			providers: [ControlContainer]
		}).compileComponents();

		fixture = TestBed.createComponent(SelectBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
