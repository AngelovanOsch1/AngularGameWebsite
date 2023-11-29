import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  usersCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
  }

  getUsersCollection(): AngularFirestoreCollection<any> {
    return this.usersCollection;
  }
}
