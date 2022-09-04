import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {GalleryComponent} from './components/gallery/gallery.component';
import {GalleryRoutingModule} from './gallery-routing-module';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GalleryRoutingModule,
    MatCardModule
  ],
  declarations: [
    GalleryComponent
  ],
  exports: [
    GalleryComponent
  ]
})

export class GalleryModule {}
