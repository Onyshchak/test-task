import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
	@Input() length = 0;

	@Input() pageSize = 9;

	@Input() pageIndex = 0;

	@Output() currentPage: EventEmitter<number> = new EventEmitter<number>();

	onPaginatorChange(event: PageEvent): void {
		this.currentPage.emit(event.pageIndex + 1);
	}
}
