import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryRoutingModule } from './gallery-routing-module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ImageCardComponent } from './components/image-card/image-card.component';

@NgModule({
	imports: [CommonModule, SharedModule, GalleryRoutingModule, MatCardModule],
	declarations: [GalleryComponent, ImageCardComponent],
	exports: [GalleryComponent]
})
export class GalleryModule {}
