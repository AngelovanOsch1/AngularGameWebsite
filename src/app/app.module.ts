import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
