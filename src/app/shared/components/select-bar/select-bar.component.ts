import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-select-bar',
	templateUrl: './select-bar.component.html',
	styleUrls: ['./select-bar.component.scss']
})
export class SelectBarComponent implements OnInit, OnDestroy {
	@Input() label = 'Select content type';

	@Input() cases: string[] = [];

	@Output() emitValue: EventEmitter<string> = new EventEmitter<string>();

	selectControl: FormControl = new FormControl('');

	private subscription!: Subscription;

	ngOnInit(): void {
		this.onValueChange();
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	private onValueChange(): void {
		this.subscription = this.selectControl.valueChanges.subscribe((value) => this.emitValue.emit(value));
	}
}
