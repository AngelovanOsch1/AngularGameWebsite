import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { RepositoryService } from '../services/repository.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseFunctionsService } from '../services/firebasefunctions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [RepositoryService, FirebaseFunctionsService],
})
export class HeaderComponent {
  showHeader: boolean = true;
  userId?: string;
  user?: User | null;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private repositoryService: RepositoryService,
    private firebaseFunctionsService: FirebaseFunctionsService,
    private afAuth: AngularFireAuth
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.showHeader = !['/login', '/signup'].includes(event.url);
      });
  }

  async ngOnInit(): Promise<any> {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userId = user.uid;
        this.user = (
          await this.repositoryService.usersCollection
            .doc<User>(this.userId!)
            .get()
            .toPromise()
        )?.data();
      } else {
        this.user = null;
      }
    });
  }

  logout() {
    this.firebaseFunctionsService.logout(this.userId!);
  }
}
