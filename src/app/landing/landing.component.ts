import { Component, OnInit } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { RepositoryService } from '../services/repository.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserAuthService } from '../services/user-auth-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [RepositoryService, UserAuthService],
})
export class LandingComponent implements OnInit {
  user: User | undefined;
  usersList: User[] = [];
  filteredUsersList: User[] = [];
  activeIndex: number = 1;
  constructor(
    private afAuth: AngularFireAuth,
    private userAuthService: UserAuthService,
    private firestore: AngularFirestore,

    private router: Router,
    private repositoryService: RepositoryService
  ) {}
  async ngOnInit(): Promise<any> {
    // this.user = await this.userAuthService.getLoggedInUser();
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

    this.firestore
      .collection(`users`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, ...data } as User;
          })
        ),
        tap((users: User[]) => {
          this.usersList = users;
        })
      )
      .subscribe();

    this.searchForm
      .get('search')!
      .valueChanges.subscribe((searchQuery: string) => {
        if (searchQuery.trim() === '') {
          this.filteredUsersList = [];
        } else {
          this.filteredUsersList = this.usersList.filter((user) => {
            return user.username
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          });
        }
      });
  }

  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  showUserProfile(userProfile: User) {
    const encodedId = btoa(userProfile.id ?? '');
    this.router.navigate(['userProfile', encodedId]);
  }

  setActive(index: number) {
    this.activeIndex = index;
  }
}
