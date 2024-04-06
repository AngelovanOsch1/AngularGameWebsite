import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { addAddressModal } from '../helper-components/add-address-modal/add-address.compontent';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, tap } from 'rxjs';
import { Address, User } from '../interfaces/interfaces';
import { UserAuthService } from '../services/user-auth-service.service';

@Component({
  selector: 'app-order-payments',
  templateUrl: './order-payments.component.html',
  styleUrls: ['./order-payments.component.scss'],
  providers: [UserAuthService],
})
export class OrderPaymentsComponent implements OnInit {
  user: User | undefined;
  addressList: Address[] = [];
  isMenuOpen: { [key: number]: boolean } = {};
  constructor(
    private userAuthService: UserAuthService,
    private firestore: AngularFirestore,
    private dialog: MatDialog
  ) {}
  async ngOnInit(): Promise<any> {
    this.user = await this.userAuthService.getLoggedInUser();
    this.firestore
      .collection(`users/${this.user?.id}/addresses`, (ref) =>
        ref.orderBy('nameOfAddressCardCreatedAt', 'asc')
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
        })
      )
      .subscribe();
  }
  toggleMenu(addressIndex: number) {
    this.isMenuOpen[addressIndex] = !this.isMenuOpen[addressIndex];
  }

  updateAddress(address: Address) {
    this.dialog.open(addAddressModal, {
    width: '750px',
    data: address,
    })
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
}
