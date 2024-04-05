import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorService {
  constructor() {}
  static onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const onlyNumbersPattern = /^[0-9]+$/;
      const valid = onlyNumbersPattern.test(control.value);
      return valid ? null : { onlyNumbersAllowed: { value: control.value } };
    };
  }
  static postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const postalCodePattern = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-zA-Z]{2}$/;
      const valid = postalCodePattern.test(control.value);
      return valid ? null : { invalidPostalCode: { value: control.value } };
    };
  }
}
