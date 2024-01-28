import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { RepositoryService } from '../services/repository.service';
import { FirebaseFunctionsService } from '../services/firebasefunctions.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [RepositoryService, FirebaseFunctionsService],
})
export class HeaderComponent implements OnInit {
  showHeader: boolean = true;
  user: User | undefined;
  private destroy$: Subject<void> = new Subject<void>();
  isScrolled: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private repositoryService: RepositoryService,
    private router: Router,
    private firebaseFunctionsService: FirebaseFunctionsService
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

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = scrollPosition >= 750;
  }

  ngOnInit(): void {
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
            this.updateUserOnlineStatus(true);
          });
      } else {
        this.user = undefined;
      }
    });
  }

  isOnShopPage(): boolean {
    return (
      this.router.url.includes('/shop') || this.router.url.includes('/article')
    );
  }
  UsesSecondHeader(): boolean {
    return (
      this.router.url.includes('/article') ||
      this.router.url.includes('/shopping-cart')
    );
  }

  logout() {
    this.firebaseFunctionsService.logout(this.user!.id ?? '');
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    this.updateUserOnlineStatus(false);
  }

  private updateUserOnlineStatus(isOnline: boolean) {
    console.log(this.user?.id);
    this.repositoryService.usersCollection.doc(this.user?.id).update({
      isOnline: isOnline,
    });
  }
}
