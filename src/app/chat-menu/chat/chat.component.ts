import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap, take, map, of } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  user: User | undefined;
  chatItemList: any[] = [];
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
              .collection('chats', (ref) =>
                ref.where('userIds', 'array-contains', this.user?.id)
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
      .subscribe((chatItem) => {
        this.chatItemList = chatItem;
      });
  }
}
