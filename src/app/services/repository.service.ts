import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Article, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  usersCollection: AngularFirestoreCollection<User>;
  forum: AngularFirestoreCollection<any>;
  shop: AngularFirestoreCollection<Article>;
  activities: AngularFirestoreCollection<any>;
  gameHighscores: AngularFirestoreCollection<any>;
  user: User | undefined;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
    this.forum = this.firestore.collection('forum');
    this.shop = this.firestore.collection('shop');
    this.activities = this.firestore.collection('activities');
    this.gameHighscores = this.firestore.collection('gameHighscores');
  }

  // async getUserDoc(userId: string): Promise<User | undefined> {
  //   return (
  //     await getDoc(doc(this.db.firestore, `users/${userId}`))
  //   ).data() as User;
  // }
}
