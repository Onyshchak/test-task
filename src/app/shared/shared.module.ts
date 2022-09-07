import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SelectBarComponent } from './components/select-bar/select-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ChipTextboxComponent } from './components/chip-textbox/chip-textbox.component';

const importExportModules = [
	CommonModule,
	MatPaginatorModule,
	MatSelectModule,
	MatInputModule,
	FormsModule,
	ReactiveFormsModule,
	MatFormFieldModule
];

@NgModule({
	imports: [...importExportModules],
	exports: [
		...importExportModules,
		SelectBarComponent,
		SearchBarComponent,
		PaginatorComponent,
		SpinnerComponent,
		ChipTextboxComponent
	],
	declarations: [SelectBarComponent, SearchBarComponent, PaginatorComponent, SpinnerComponent, ChipTextboxComponent]
})
export class SharedModule {}
