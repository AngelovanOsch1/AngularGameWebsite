import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, take, takeUntil } from 'rxjs/operators';
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
export class HeaderComponent implements OnInit {
  showHeader: boolean = true;
  userId?: string;
  user?: User | null;
  private destroy$: Subject<void> = new Subject<void>();
  isScrolled: boolean = false;

  constructor(
    private router: Router,
    private repositoryService: RepositoryService,
    private firebaseFunctionsService: FirebaseFunctionsService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
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
            this.user = snapshot?.data();
          });
      } else {
        this.user = null;
      }
    });
  }

  isOnShopPage(): boolean {
    return this.router.url.includes('/shop');
  }

  logout() {
    this.firebaseFunctionsService.logout(this.userId!);
  }
}
