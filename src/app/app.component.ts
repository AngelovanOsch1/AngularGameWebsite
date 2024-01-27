import { Component, HostListener, OnInit } from '@angular/core';
import { RepositoryService } from './services/repository.service';
import { User } from './interfaces/interfaces';
import { UserAuthService } from './services/user-auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RepositoryService, UserAuthService],
})
export class AppComponent implements OnInit {
  user: User | undefined;
  constructor(
    private userAuthService: UserAuthService,
    private repositoryService: RepositoryService
  ) {}

  async ngOnInit(): Promise<any> {
    this.user = await this.userAuthService.getLoggedInUser();
    this.updateUserOnlineStatus(true);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    this.updateUserOnlineStatus(false);
  }

  private updateUserOnlineStatus(isOnline: boolean) {
    this.repositoryService.usersCollection.doc(this.user?.id).update({
      isOnline: isOnline,
    });
  }
}
