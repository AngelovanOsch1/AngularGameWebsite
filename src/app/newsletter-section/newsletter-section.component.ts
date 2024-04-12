import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { User } from '../interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponentComponent } from '../helper-components/warning-component/warning-component.component';
import { UserAuthService } from '../services/user-auth-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-newsletter-section',
  templateUrl: './newsletter-section.component.html',
  styleUrls: ['./newsletter-section.component.scss'],
  providers: [UserAuthService],
})
export class NewsletterSectionComponent implements OnInit {
  user: User | undefined;
  userId: string | undefined;
  renderNewsLetter: boolean = true;
  constructor(
    private userAuthService: UserAuthService,
    private firestore: AngularFirestore,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<any> {
    this.user = await this.userAuthService.getLoggedInUser();
  }
  submitNewsletterForm() {
    if (!this.user) {
      this.dialog.open(WarningComponentComponent, {
        width: '250px',
        data: { text: 'Are you not logged in yet?', url: '/login' },
      });
    } else {
      this.firestore.doc(`users/${this.user.id}`).update({
        newsletter: true,
      });
      this.toastService.show('Thank you for your interest in our newsletter!');
      this.renderNewsLetter = false;
    }
  }
}
