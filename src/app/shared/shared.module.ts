import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent }from './components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[ DropdownComponent ]
})
export class SharedModule { }
