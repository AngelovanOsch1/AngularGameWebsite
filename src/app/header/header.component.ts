import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { RepositoryService } from '../services/repository.service';
import { FirebaseFunctions } from '../firebase/firebase_functions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [RepositoryService, FirebaseFunctions],
})
export class HeaderComponent implements OnDestroy {
  showHeader: boolean = true;
  userId = localStorage.getItem('userId') ?? null;
  user?: User;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private repositoryService: RepositoryService,
    private firebaseFunctionsService: FirebaseFunctions
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
    this.user = (
      await this.repositoryService
        .getUsersCollection()
        .doc<User>(this.userId!)
        .get()
        .toPromise()
    )?.data();

    console.log(this.user?.isOnline);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.firebaseFunctionsService.logout(this.userId!);
  }
}
