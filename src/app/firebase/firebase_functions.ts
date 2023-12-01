// auth.service.ts

import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  reauthenticateWithCredential,
  signOut,
  onAuthStateChanged,
  UserCredential,
  Auth,
} from 'firebase/auth';
import { auth } from './firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFunctions {
  constructor(private toastService: ToastService) {}
  async createUser(
    email: string,
    password: string
  ): Promise<UserCredential | undefined> {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredentials;
    } catch (e: any) {
      const error: string = e.code;
      switch (error) {
        case 'auth/email-already-in-use':
          this.toastService.show('Deze E-mail adres in al ingebruik');
          break;
        case 'auth/invalid-email':
          this.toastService.show('onjuiste E-mail adress');
          break;
        case 'auth/weak-password':
          this.toastService.show(
            'Wachtwoord is niet sterk genoeg. Wachtwoord moet minimaal 5 tekens zijn'
          );
          break;
        default:
          this.toastService.show(
            'Oeps! Er is iets verkeerd gegaan. Probeer het later nog een keer'
          );
          break;
      }
      return undefined;
    }
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<UserCredential | undefined> {
    try {
      const userCredentials = signInWithEmailAndPassword(auth, email, password);
      return userCredentials;
    } catch (e: any) {
      const error: string = e.code;
      switch (error) {
        case 'invalid-email':
          this.toastService.show('Onjuiste E-mail adress');
          break;
        case 'user-disabled':
          this.toastService.show('Deze user is geblokkeerd');
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          this.toastService.show('Onjuiste email of wachtwoord gegevens');
          break;
        default:
      }
    }
    return undefined;
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
  }
});
