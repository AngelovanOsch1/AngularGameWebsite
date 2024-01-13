import { Component, OnInit } from '@angular/core';
import {} from '@angular/forms';
import { RepositoryService } from '../services/repository.service';
import { ToastService } from '../services/toast.service';
import { User } from '../interfaces/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponentComponent } from '../helper-components/warning-component/warning-component.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-newsletter-section',
  templateUrl: './newsletter-section.component.html',
  styleUrls: ['./newsletter-section.component.scss'],
})
export class NewsletterSectionComponent implements OnInit {
  user: User | undefined;
  userId: string | undefined;

  async ngOnInit(): Promise<any> {
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
        this.user = undefined;
      }
    });
  }
  constructor(
    private repositoryService: RepositoryService,
    private toastService: ToastService,
    private afAuth: AngularFireAuth,
    private dialog: MatDialog
  ) {}

  submitNewsletterForm() {
    if (!this.user?.isOnline) {
      this.dialog.open(WarningComponentComponent, {
        width: '250px',
        data: { text: 'Are you not logged in yet?', url: '/login' },
      });
    } else {
      this.repositoryService.usersCollection.doc(this.userId).update({
        newsletter: true,
      });
      this.toastService.show('Thank you for your interest in our newsletter!');
    }
  }
}
