import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LeaderboardComponent } from '../app/leaderboard/leaderboard.component';
import { ShopComponent } from '../app/shop/shop.component';
import { EventsComponent } from '../app/events/events.component';
import { LandingComponent } from '../app/landing/landing.component';
import { ArticleComponent } from './shop/article/article.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderPaymentsComponent } from './order-payments/order-payments.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'events', component: EventsComponent },
  { path: 'userProfile/:id', component: UserProfileComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'order-payments', component: OrderPaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
