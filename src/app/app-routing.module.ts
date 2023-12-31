import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LeaderboardComponent } from '../app/leaderboard/leaderboard.component';
import { ShopComponent } from '../app/shop/shop.component';
import { ForumsComponent } from '../app/forums/forums.component';
import { EventsComponent } from '../app/events/events.component';
import { LandingComponent } from '../app/landing/landing.component';
import { ArticleComponent } from './shop/article/article.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'forums', component: ForumsComponent },
  { path: 'events', component: EventsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
