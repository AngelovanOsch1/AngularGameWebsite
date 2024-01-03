import { Component, OnInit } from '@angular/core';
import {} from '@angular/forms';
import { RepositoryService } from '../services/repository.service';
import { ToastService } from '../services/toast.service';
import { User } from '../interfaces/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-newsletter-section',
  templateUrl: './newsletter-section.component.html',
  styleUrls: ['./newsletter-section.component.scss'],
})
export class NewsletterSectionComponent implements OnInit {
  user: User | undefined;
  userId: string | undefined;

  async ngOnInit(): Promise<any> {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userId = user.uid;
        this.user = (
          await this.repositoryService.usersCollection
            .doc<User>(user.uid)
            .get()
            .toPromise()
        )?.data();
      } else {
        this.user = undefined;
      }
    });
  }
  constructor(
    private repositoryService: RepositoryService,
    private toastService: ToastService,
    private afAuth: AngularFireAuth
  ) {}

  submitForm() {
    this.repositoryService.usersCollection.doc(this.userId).update({
      newsletter: true,
    });
    this.toastService.show('Thank you for your interest in our newsletter!');
  }
}
