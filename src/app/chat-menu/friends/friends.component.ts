import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, of, switchMap, take } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  user: User | undefined;
  friendRequestsList: any | undefined;

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

  acceptFriendRequest(friendRequests: any) {
    // const relationshipsCollection = this.firestore.collection(
    //   `users/${friendRequests.sentBy}/relationships`
    // );

    // const documentId = 'your_document_id';

    // relationshipsCollection
    //   .doc(documentId)
    //   .update({
    //     friendList: ['test12356'],
    //   })

    this.firestore.collection('chats').add({
      date: new Date(),
      lastMessage: '',
      userIds: [friendRequests.sentBy, friendRequests.receiverId],
    });
  }
  denyFriendRequest(friendRequests: any) {}
}
