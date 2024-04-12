import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { addAddressModal } from '../helper-components/add-address-modal/add-address.compontent';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, tap } from 'rxjs';
import { Address, User } from '../interfaces/interfaces';
import { UserAuthService } from '../services/user-auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-payments',
  templateUrl: './order-payments.component.html',
  styleUrls: ['./order-payments.component.scss'],
  providers: [UserAuthService],
})
export class OrderPaymentsComponent implements OnInit {
  user: User | undefined;
  addressList: Address[] = [];
  toggleKebabMenu: string | undefined;
  selectedAddress: Address | undefined;
  constructor(
    private userAuthService: UserAuthService,
    private firestore: AngularFirestore,
    private toastService: ToastService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  async ngOnInit(): Promise<any> {
    this.user = await this.userAuthService.getLoggedInUser();
    this.firestore
      .collection(`users/${this.user?.id}/addresses`, (ref) =>
        ref.orderBy('nameOfAddressCardCreatedAt', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Address;
            const id = a.payload.doc.id;
            return { id, ...data } as Address;
          })
        ),
        tap((address: Address[]) => {
          this.addressList = address;
          this.selectedAddress = address[0];
        })
      )
      .subscribe();
  }

  checkoutForm: FormGroup = new FormGroup({
    selectedAddress: new FormControl('', Validators.required),
  });
  toggleMenu(event: Event, address: Address) {
    event.stopPropagation();
    if (this.toggleKebabMenu === address.id) {
      return this.toggleKebabMenu = undefined;
    }
    this.toggleKebabMenu = address.id;
  }

  selectAddress(address: Address) {
    this.selectedAddress = address;
    this.checkoutForm.controls['selectedAddress'].setValue(address);
  }

  updateAddress(event: Event, address: Address) {
    event.stopPropagation();
    this.toggleKebabMenu = undefined;
    this.dialog.open(addAddressModal, {
      width: '750px',
      data: address,
    });
  }

  deleteAddress(address: Address) {
    this.firestore
      .collection(`users/${this.user?.id}/addresses`)
      .doc(address.id)
      .delete();
  }
  addAddress() {
    this.dialog.open(addAddressModal, {
      width: '750px',
    });
  }

  submitCheckoutForm() {
    if (this.checkoutForm.invalid) {
      return this.toastService.show('Please select an address to continue');
    }
    this.router.navigate(['home']);
  }
}
