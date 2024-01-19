import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { RepositoryService } from '../services/repository.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss'],
  providers: [RepositoryService],
})
export class ChatMenuComponent implements OnInit {
  user: User | undefined;
  friendRequestsList: any | undefined;

  isChatOpen: boolean | undefined;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private repositoryService: RepositoryService
  ) {}

  ngOnInit(): void {
    this.afAuth.authState
      .pipe(
        switchMap((user) => {
          if (user) {
            // Fetch user details from Firestore using the user's UID
            return this.repositoryService.usersCollection
              .doc<User>(user.uid)
              .get()
              .pipe(
                take(1),
                map((snapshot) => {
                  const data = snapshot?.data() as User;
                  const id = snapshot.id;
                  this.user = { id, ...data } as User;
                  return user;
                })
              );
          } else {
            this.user = undefined;
            return of(null);
          }
        }),
        switchMap((user) => {
          if (user) {
            return this.firestore
              .collection('friendRequests', (ref) =>
                ref.where('receiverId', '==', this.user?.id)
              )
              .snapshotChanges()
              .pipe(
                map((actions) =>
                  actions.map((a: any) => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  })
                )
              );
          } else {
            return of([]);
          }
        })
      )
      .subscribe((friendRequestsList) => {
        this.friendRequestsList = friendRequestsList;
      });
  }

  openChat() {
    this.isChatOpen ? (this.isChatOpen = false) : (this.isChatOpen = true);
  }
}
