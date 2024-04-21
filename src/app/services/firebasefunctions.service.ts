import { HostListener, Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { ToastService } from '../services/toast.service';
import { RepositoryService } from '../services/repository.service';
import { Router } from '@angular/router';
import { auth } from '../firebase/firebase';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFunctionsService {
  userCredentials: UserCredential | undefined;

  constructor(
    private toastService: ToastService,
    private repositoryService: RepositoryService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async createUser(
    email: string,
    password: string
  ): Promise<UserCredential | null> {
    try {
      this.userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await this.afAuth.setPersistence('session');
      return this.userCredentials;
    } catch (e: any) {
      const error: string = e.code;
      switch (error) {
        case 'auth/email-already-in-use':
          this.toastService.show('This email address is already in use');
          break;
        case 'auth/invalid-email':
          this.toastService.show('Incorrect email address');
          break;
        case 'auth/weak-password':
          this.toastService.show(
            'Password is not strong enough. Password must be at least 6 characters'
          );
          break;
        default:
          this.toastService.show('Oops! Something went wrong. Try again later');
      }
      return null;
    }
  }

  async loginUser(
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<UserCredential | null> {
    try {
      this.userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (rememberMe) {
        await this.afAuth.setPersistence('local');
      } else {
        await this.afAuth.setPersistence('session');
      }

      return this.userCredentials;
    } catch (e: any) {
      const error: string = e.code;

      switch (error) {
        case 'auth/invalid-email':
          this.toastService.show('Incorrect e-mail address');
          break;
        case 'auth/invalid-credential':
          this.toastService.show('Login details invalid');
          break;
        case 'auth/user-disabled':
          this.toastService.show('This user has been blocked');
          break;
        case 'auth/INVALID_LOGIN_CREDENTIALS':
          this.toastService.show('Incorrect email or password information');
          break;
        default:
          this.toastService.show('Oops! Something went wrong. Try again later');
      }
    }
    return null;
  }

  async logout(userId: string) {
    try {
      await signOut(auth);
      this.repositoryService.usersCollection.doc(userId).update({
        isOnline: false,
      });
      this.router.navigate(['/']);
    } catch (e) {
      this.toastService.show('Oops! Something went wrong. Try again later');
    }
  }
}
