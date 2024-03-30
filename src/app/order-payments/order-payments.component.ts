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
  constructor(private toastService: ToastService, private dialog: MatDialog) {}

  addAddress() {
         this.dialog.open(addAddressModal, {
           width: '250px',
           data: { text: 'Are you not logged in yet?', url: '/login' },
         });
  }
}
