import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  constructor() { }

  limitValidator(min: number, max: number){      //factory function

    return (control: AbstractControl):{[key: string]: boolean} | null => {
  
    if( control.value !==null && (isNaN(control.value) || control.value <min  || control.value> max)){
      return {exceedingLimit: true}
    }
    
    return null;
  };
  }
 
}
