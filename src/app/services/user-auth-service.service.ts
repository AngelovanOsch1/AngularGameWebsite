import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RepositoryService } from './repository.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  user: User | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private repositoryService: RepositoryService
  ) {}

  async getLoggedInUser(): Promise<User | undefined> {
    return new Promise((resolve) => {
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
              resolve(this.user);
            });
        } else {
          this.user = undefined;
          resolve(this.user);
        }
      });
    });
  }
}
