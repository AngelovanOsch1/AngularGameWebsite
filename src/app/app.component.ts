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
export class AppComponent {}
