import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { RepositoryService } from '../services/repository.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserAuthService } from '../services/user-auth-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [RepositoryService, UserAuthService],
})
export class LandingComponent implements OnInit {
  user: User | undefined;

  userObservable: Observable<User[]> | undefined;
  usersList: User[] = [];

  filteredUsersList: User[] = [];

  activeIndex: number = 1;

  constructor(
    private afAuth: AngularFireAuth,

    private userAuthService: UserAuthService,
    private repositoryService: RepositoryService
  ) {
    this.userObservable = this.repositoryService.usersCollection.valueChanges();
  }
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
            console.log(this.user);
          });
      } else {
        this.user = undefined;
      }
    });

    this.userObservable?.subscribe((UserDoc: User[]) => {
      this.usersList = UserDoc;
    });

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
    console.log(userProfile);
  }

  setActive(index: number) {
    this.activeIndex = index;
  }
}
