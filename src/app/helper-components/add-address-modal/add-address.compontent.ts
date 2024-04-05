import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidatorService } from 'src/app/custom-validator-services';
import { Country, Gender } from 'src/app/enums/enums';

@Component({
  selector: 'app-warning-component',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class addAddressModal implements OnInit {
  genderList: string[] = Object.values(Gender);
  countryList: string[] = Object.values(Country);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<addAddressModal>,
  ) {}
  ngOnInit(): void {}
  addressForm: FormGroup = new FormGroup({
    nameOfAddressCard: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    postal: new FormControl ('', [Validators.required, CustomValidatorService.postalCodeValidator()]),    streetName: new FormControl('', Validators.required),
    houseNumber: new FormControl('', [Validators.required, CustomValidatorService.onlyNumbersValidator()]),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  closeModal() {
    this.dialogRef.close();
  }
  getError(name: string) {
    const field = this.addressForm.get(name);
    let error: string;

    if (field!.touched || !field!.pristine) {
      if (field!.hasError('invalidPostalCode')) {
        error = 'Invalid postal code';
      }

      if (field!.hasError('onlyNumbersAllowed')) {
        error = 'Only numbers are allowed in this field';
      }

      if (field!.hasError('required')) {
        error = 'This field is required';
      }
    }
    return error! as string;
  }
  submitAddressForm() {
    if (this.addressForm.invalid) {
      return this.addressForm.markAllAsTouched();
    }
  }
}

