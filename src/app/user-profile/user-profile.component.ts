import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { RepositoryService } from '../services/repository.service';
import { UserAuthService } from '../services/user-auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [RepositoryService, UserAuthService],
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  userProfile: User | undefined;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private repositoryService: RepositoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const encodedId = this.route.snapshot.params['id'];
    const userProfileId = atob(encodedId);
    this.firestore
      .doc<User>(`users/${userProfileId}`)
      .get()
      .pipe(take(1))
      .subscribe((snapshot) => {
        const data = snapshot?.data() as User;
        const id = snapshot.id;
        this.userProfile = { id, ...data } as User;
      });

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.repositoryService.usersCollection
          .doc<User>(user.uid)
          .get()
          .pipe(take(1))
          .subscribe((snapshot) => {
            const data = snapshot?.data() as User;
            const id = snapshot.id;
            this.user = { id, ...data } as User;
          });
      } else {
        this.user = undefined;
      }
    });
  }
  sendFriendRequest() {
    this.firestore.collection(`friendRequests`).add({
      sentBy: this.user?.id,
      receiverId: this.userProfile?.id,
      date: new Date(),
    });
  }
}
