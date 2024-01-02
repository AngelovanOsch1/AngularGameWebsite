import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ShopComponent } from './shop/shop.component';
import { ForumsComponent } from './forums/forums.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './shop/article/article.component';


@NgModule({
  declarations: [AppComponent, SignupComponent, LoginComponent, HeaderComponent, LandingComponent, LeaderboardComponent, ShopComponent, ForumsComponent, EventsComponent, FooterComponent, ArticleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
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
