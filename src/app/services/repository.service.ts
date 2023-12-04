import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  usersCollection: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
  }

  getUsersCollection(): AngularFirestoreCollection<User> {
    return this.usersCollection;
  }
}
