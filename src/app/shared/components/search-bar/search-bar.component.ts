import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	@Input() public label = 'Search';
	@Input() public formControlName!: string;
	public formControl!: FormControl<string>;

	constructor(private controlContainer: ControlContainer) {}

	ngOnInit(): void {
		this.formControl = this.controlContainer.control?.get(this.formControlName) as FormControl<string>;
	}
}
