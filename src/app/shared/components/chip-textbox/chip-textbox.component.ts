import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-chip-textbox',
	templateUrl: './chip-textbox.component.html',
	styleUrls: ['./chip-textbox.component.scss']
})
export class ChipTextboxComponent implements OnInit {
	@Input() public label = 'Search';
	@Input() public formControlName!: string;
	@Output() emitChips: EventEmitter<string[]> = new EventEmitter<string[]>();
	public formGroup!: FormGroup;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.createGroup();
	}

	addChip(): void {
		const text = this.formGroup.get('chip')!.value;
		if (!text) {
			return;
		}
		this.formArr.push(new FormControl(text));
		this.formGroup.get('chip')!.reset();
		this.emitChips.emit(this.formArr.value);
	}

	removeChip(index: number): void {
		this.formArr.removeAt(index);
		this.emitChips.emit(this.formArr.value);
	}

	get formArr(): FormArray {
		return this.formGroup.get('chipList') as FormArray;
	}

	private createGroup(): void {
		this.formGroup = this.fb.group({
			chip: '',
			chipList: this.fb.array([])
		});
	}
}
