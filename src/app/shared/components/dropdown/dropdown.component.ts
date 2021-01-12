import { Component, OnInit,Input, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Dropdown, DropdownItem } from './dropdown-interface';
import { MakeProvider, AbstractValueAccessor } from '../../abstract-value-accessor';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    MakeProvider(DropdownComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent  extends AbstractValueAccessor {
  
  @Input() options:string[];

  @Input() placeholder: string;

  @Input() strict:boolean;

  @Output()
  select = new EventEmitter<any>();

  isFocused: boolean = false;

  constructor(private el:ElementRef,private ref: ChangeDetectorRef) { 
    super();
  }

  onSelect (item: any) {
    //console.log(JSON.stringify(item.target.value));
    this.writeValue(item.target.value);
    this.select.emit(item);
  }

  onTextChange(event:any){
    /*console.log(event);
    this.onChange(event);*/
  }

  onOptionClick(event:any) {
    this.writeValue(event.target.value);
    this.select.emit(event);
  }
  
  onFocus(){
    this.isFocused = true;
    this.writeValue('');
  }

  onFocusOut() {
    setTimeout( () => { 
      this.isFocused = false;
      if(this.options == undefined || (this.strict &&  this.options.indexOf(this.value) < 0 ))
        this.writeValue('');
      this.ref.detectChanges();
     } , 200);
    
  }

  setClass(option:string){
    let classes  = {
      hide:option.toLowerCase().indexOf(this.value.toLowerCase()) < 0
    };

    return classes;
  }
}
