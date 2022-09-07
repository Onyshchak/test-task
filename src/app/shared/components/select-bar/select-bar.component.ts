import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';

@Component({
	selector: 'app-select-bar',
	templateUrl: './select-bar.component.html',
	styleUrls: ['./select-bar.component.scss']
})
export class SelectBarComponent implements OnInit {
	@Input() label = 'Select type';
	@Input() formControlName!: string;
	@Input() cases: string[] = [];

	selectControl!: FormControl<string>;

	constructor(private controlContainer: ControlContainer) {}

	ngOnInit(): void {
		this.selectControl = this.controlContainer.control?.get(this.formControlName) as FormControl<string>;
	}
}
