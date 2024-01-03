import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { RepositoryService } from '../services/repository.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [RepositoryService],
})
export class LandingComponent implements OnInit {
  userObservable: Observable<User[]> | undefined;
  usersList: User[] = [];

  filteredUsersList: User[] = [];

  activeIndex: number = 1;

  constructor(private repositoryService: RepositoryService) {
    this.userObservable = this.repositoryService.usersCollection.valueChanges();
  }
  ngOnInit() {
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
