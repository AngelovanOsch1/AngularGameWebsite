import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { ShoppingCart, User } from '../interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserAuthService } from '../services/user-auth-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { increment } from 'firebase/firestore';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [UserAuthService],
})
export class ShoppingCartComponent implements OnInit {
  user: User | undefined;
  shoppingCartList: ShoppingCart[] = [];
  shoppingCartFormGroups: FormGroup[] = [];
  totalItems: number = 0;

  constructor(
    private firestore: AngularFirestore,
    private userAuthService: UserAuthService
  ) {}
  async ngOnInit(): Promise<any> {
    this.user = await this.userAuthService.getLoggedInUser();

    this.firestore
      .collection(`users/${this.user!.id}/shoppingcart`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as ShoppingCart;
            const id = a.payload.doc.id;
            return { id, ...data } as ShoppingCart;
          })
        ),
        tap((shoppingCart: ShoppingCart[]) => {
          this.shoppingCartList = shoppingCart;
          this.shoppingCartFormGroups = [];
          this.totalItems = shoppingCart.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          this.shoppingCartList.forEach((shoppingCartItem) => {
            const shoppingCartForm = new FormGroup({
              quantity: new FormControl(shoppingCartItem.quantity),
            });
            this.shoppingCartFormGroups.push(shoppingCartForm);
          });
        })
      )
      .subscribe();
  }

  shoppingCartForm: FormGroup = new FormGroup({
    quantity: new FormControl(),
  });

  decrementQuantity(shoppingCartItem: ShoppingCart) {
    this.firestore
      .collection(`users/${this.user!.id}/shoppingcart`)
      .doc(shoppingCartItem.id)
      .update({
        quantity: increment(-1),
      });
  }

  incrementQuantity(shoppingCartItem: ShoppingCart) {
    this.firestore
      .collection(`users/${this.user!.id}/shoppingcart`)
      .doc(shoppingCartItem.id)
      .update({
        quantity: increment(1),
      });
  }
  inputQuantity(shoppingCartItem: ShoppingCart, i: number) {
    const quantityValue = this.shoppingCartFormGroups[i].get('quantity')!.value;

    this.firestore
      .collection(`users/${this.user!.id}/shoppingcart`)
      .doc(shoppingCartItem.id)
      .update({
        quantity: quantityValue,
      });
  }
}
