import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsPageComponent } from './pages/forms-page/forms-page.component';
import { ReactiveFormsModule } from '@angular/forms';

import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FilterListPipeModule } from '@shared/pipes/filter-list/order-list.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [FormsPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsRoutingModule,
    RadioButtonModule,
    CalendarModule,
    InputNumberModule,
    FilterListPipeModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    AutoCompleteModule,
  ],
})
export class FormsModule {}
