import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidatorService } from 'src/app/custom-validator-services';
import { Country, Gender } from 'src/app/enums/enums';
import { Address, User } from 'src/app/interfaces/interfaces';
import { ToastService } from 'src/app/services/toast.service';
import { UserAuthService } from 'src/app/services/user-auth-service.service';

@Component({
  selector: 'app-warning-component',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  providers: [UserAuthService],
})
export class addAddressModal implements OnInit {
  addressUpdateComponent: boolean | undefined;
  user: User | undefined;
  genderList: string[] = Object.values(Gender);
  countryList: string[] = Object.values(Country);

  constructor(
    private userAuthService: UserAuthService,
    private firestore: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: Address,
    private dialogRef: MatDialogRef<addAddressModal>,
    private toastService: ToastService
  ) {}
  async ngOnInit(): Promise<any> {
    this.user = await this.userAuthService.getLoggedInUser();
    this.addressUpdateComponent = this.data ? true : false;
    if (this.addressUpdateComponent) {
      this.addressForm.controls['nameOfAddressCard'].setValue(
        this.data.nameOfAddressCard
      );
      this.addressForm.controls['firstName'].setValue(this.data.firstName);
      this.addressForm.controls['lastName'].setValue(this.data.lastName);
      this.addressForm.controls['postal'].setValue(this.data.postal);
      this.addressForm.controls['streetName'].setValue(this.data.streetName);
      this.addressForm.controls['houseNumber'].setValue(this.data.houseNumber);
      this.addressForm.controls['city'].setValue(this.data.city);
      this.addressForm.controls['country'].setValue(this.data.country);
      this.addressForm.controls['gender'].setValue(this.data.gender);
    }
  }
  addressForm: FormGroup = new FormGroup({
    nameOfAddressCard: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    postal: new FormControl('', [
      Validators.required,
      CustomValidatorService.postalCodeValidator(),
    ]),
    streetName: new FormControl('', Validators.required),
    houseNumber: new FormControl('', [
      Validators.required,
      CustomValidatorService.onlyNumbersValidator(),
    ]),
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

    const nameOfAddressCard =
      this.addressForm.controls['nameOfAddressCard'].value;
    const firstName = this.addressForm.controls['firstName'].value;
    const lastName = this.addressForm.controls['lastName'].value;
    const postal = this.addressForm.controls['postal'].value
      .trim()
      .toUpperCase();
    const streetName = this.addressForm.controls['streetName'].value;
    const houseNumber = this.addressForm.controls['houseNumber'].value;
    const city = this.addressForm.controls['city'].value;
    const country = this.addressForm.controls['country'].value;
    const gender = this.addressForm.controls['gender'].value;

    if (this.addressUpdateComponent) {
      this.firestore
        .collection(`users/${this.user?.id}/addresses`)
        .doc(this.data.id)
        .update({
          nameOfAddressCard: nameOfAddressCard,
          firstName: firstName,
          lastName: lastName,
          postal: postal,
          streetName: streetName,
          houseNumber: houseNumber,
          city: city,
          country: country,
          gender: gender,
          nameOfAddressCardCreatedAt: new Date(),
        });

      this.dialogRef.close();
      this.toastService.show('Address card has been updated');
    } else {
      this.firestore.collection(`users/${this.user?.id}/addresses`).add({
        nameOfAddressCard: nameOfAddressCard,
        firstName: firstName,
        lastName: lastName,
        postal: postal,
        streetName: streetName,
        houseNumber: houseNumber,
        city: city,
        country: country,
        gender: gender,
        nameOfAddressCardCreatedAt: new Date(),
      });

      this.dialogRef.close();
      this.toastService.show('Address card has been added');
    }
  }
}