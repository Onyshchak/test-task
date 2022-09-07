import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipTextboxComponent } from './chip-textbox.component';
import { FormBuilder } from '@angular/forms';

describe('ChipTextboxComponent', () => {
	let component: ChipTextboxComponent;
	let fixture: ComponentFixture<ChipTextboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChipTextboxComponent],
			providers: [FormBuilder]
		}).compileComponents();

		fixture = TestBed.createComponent(ChipTextboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should add chip and reset', () => {
		component.formGroup.patchValue({ chip: 'some chip' });
		component.addChip();
		expect(component.formGroup.get('chipList')!.value.length).toBe(1);
		expect(component.formGroup.get('chip')!.value).toBe(null);
	});

	it('should remove chip', () => {
		component.removeChip(1);
		expect(component.formGroup.get('chipList')!.value.length).toBe(0);
	});

	it('should skip empty chip', () => {
		const lengthBefore = component.formGroup.get('chipList')!.value.length;
		component.addChip();
		expect(lengthBefore).toBe(component.formGroup.get('chipList')!.value.length);
	});
});
