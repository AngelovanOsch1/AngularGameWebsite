import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Article, User } from '../interfaces/interfaces';
import { getDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  usersCollection: AngularFirestoreCollection<User>;
  addresses: AngularFirestoreCollection<any>;
  purchaseHistory: AngularFirestoreCollection<any>;
  forum: AngularFirestoreCollection<any>;
  forumPosts: AngularFirestoreCollection<any>;
  forumPostUserComments: AngularFirestoreCollection<any>;
  shop: AngularFirestoreCollection<Article>;
  shopArticles: AngularFirestoreCollection<any>;
  shopArticlesUserComments: AngularFirestoreCollection<any>;
  activities: AngularFirestoreCollection<any>;
  gameHighscores: AngularFirestoreCollection<any>;

  user: User | undefined;

  constructor(
    private firestore: AngularFirestore,
    private db: AngularFirestore
  ) {
    this.usersCollection = this.firestore.collection('users');
    this.addresses = this.firestore.collection('addresses');
    this.purchaseHistory = this.firestore.collection('purchaseHistory');
    this.forum = this.firestore.collection('forum');
    this.purchaseHistory = this.firestore.collection('purchaseHistory');
    this.forumPosts = this.firestore.collection('forumPosts');
    this.forumPostUserComments = this.firestore.collection(
      'forumPostUserComments'
    );
    this.shop = this.firestore.collection('shop');
    this.shopArticles = this.firestore.collection('shopArticles');
    this.shopArticlesUserComments = this.firestore.collection(
      'shopArticlesUserComments'
    );
    this.activities = this.firestore.collection('activities');
    this.gameHighscores = this.firestore.collection('gameHighscores');
  }

  async getUserDoc(userId: string): Promise<User | undefined> {
    return (
      await getDoc(doc(this.db.firestore, `users/${userId}`))
    ).data() as User;
  }
}
