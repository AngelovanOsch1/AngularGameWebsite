import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { ShoppingCart, User } from '../interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserAuthService } from '../services/user-auth-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [UserAuthService],
})
export class ShoppingCartComponent implements OnInit {
  user: User | undefined;
  shoppingCartList: ShoppingCart[] = [];

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
        })
      )
      .subscribe();
  }
}
