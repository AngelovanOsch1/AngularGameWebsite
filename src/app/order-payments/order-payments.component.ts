import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../services/toast.service';
import { addAddressModal } from '../helper-components/add-address-modal/add-address.compontent';


@Component({
  selector: 'app-order-payments',
  templateUrl: './order-payments.component.html',
  styleUrls: ['./order-payments.component.scss'],
})
export class OrderPaymentsComponent {
  isMenuOpen: { [key: number]: boolean } = {};
  constructor(private toastService: ToastService, private dialog: MatDialog) {}
  toggleMenu(addressIndex: number) {
    this.isMenuOpen[addressIndex] = !this.isMenuOpen[addressIndex];
  }
  addAddress() {
    this.dialog.open(addAddressModal, {
      width: '750px',
      data: { text: 'You paid succesfully !!!', url: '/order-payments' },
    });
  }
}
