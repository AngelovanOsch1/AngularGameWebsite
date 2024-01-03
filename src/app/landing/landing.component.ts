import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { RepositoryService } from '../services/repository.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [RepositoryService],
})
export class LandingComponent implements OnInit {
  user: User | undefined;

  userObservable: Observable<User[]> | undefined;
  usersList: User[] = [];

  filteredUsersList: User[] = [];

  activeIndex: number = 1;

  constructor(
    private repositoryService: RepositoryService,
    private afAuth: AngularFireAuth
  ) {
    this.userObservable = this.repositoryService.usersCollection.valueChanges();
  }
  async ngOnInit(): Promise<any> {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.user = (
          await this.repositoryService.usersCollection
            .doc<User>(user.uid)
            .get()
            .toPromise()
        )?.data();
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
