import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { PageEvent } from '@angular/material/paginator';

describe('PaginatorComponent', () => {
	let component: PaginatorComponent;
	let fixture: ComponentFixture<PaginatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PaginatorComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PaginatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit page', () => {
		const event = spyOn(component.currentPage, 'emit');
		component.onPaginatorChange({ pageIndex: 5 } as PageEvent);
		expect(event).toHaveBeenCalledWith(6);
	});
});
