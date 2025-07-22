import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalLoaderComponent } from './global-loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [GlobalLoaderComponent],
  imports: [CommonModule, ProgressSpinnerModule],
  exports: [GlobalLoaderComponent]
})
export class GlobalLoaderModule {} 