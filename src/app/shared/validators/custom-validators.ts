import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    constructor(){}

    public rangeValidator(min: number, max: number) {      //factory function

        return (control: AbstractControl):{[key: string]: boolean} | null => {
      
        if( control.value !==null && (isNaN(control.value) || control.value <min  || control.value> max)){
          return {exceedingRange: true}
        }
        return null;
      };
      }
}