import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ShopComponent } from './shop/shop.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterSectionComponent } from './newsletter-section/newsletter-section.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WarningComponentComponent } from './helper-components/warning-component/warning-component.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ArticleComponent } from './shop/article/article.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatComponent } from './chat-menu/chat/chat.component';
import { ChatItemComponent } from './chat-menu/chat/chat-item/chat-item.component';
import { ChatMenu } from './chat-menu/chat-menu.component';
import { FriendsComponent } from './chat-menu/friends/friends.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderPaymentsComponent } from './order-payments/order-payments.component';
import { addAddressModal } from './helper-components/add-address-modal/add-address.compontent';
import { AuthfooterComponent } from './auth/auth-footer/auth-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    LandingComponent,
    LeaderboardComponent,
    ShopComponent,
    EventsComponent,
    FooterComponent,
    NewsletterSectionComponent,
    WarningComponentComponent,
    ArticleComponent,
    PaginationComponent,
    UserProfileComponent,
    ChatMenu,
    FriendsComponent,
    ChatComponent,
    ChatItemComponent,
    FriendsComponent,
    ShoppingCartComponent,
    OrderPaymentsComponent,
    addAddressModal,
    AuthfooterComponent,
  ],
  imports: [
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAYffvUNsu0hA40k3eP2O0zdNCnvrQGym8',
      authDomain: 'angulargamewebsite.firebaseapp.com',
      projectId: 'angulargamewebsite',
      storageBucket: 'angulargamewebsite.appspot.com',
      messagingSenderId: '1079738413297',
      appId: '1:1079738413297:web:8f037f13d2e8195a233950',
      measurementId: 'G-KDZ5D9J89E',
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
