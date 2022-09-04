import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
	@Input() label = 'Search';

	@Output() emitValue: EventEmitter<string> = new EventEmitter<string>();

	emitString(value: string): void {
		this.emitValue.emit(value);
	}
}
