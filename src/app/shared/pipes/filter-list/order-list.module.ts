import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterListPipe } from './order-list.pipe';

@NgModule({
  declarations: [FilterListPipe],
  imports: [CommonModule],
  exports: [FilterListPipe],
})
export class FilterListPipeModule {}
