import { Component, OnInit } from '@angular/core';
import {} from '@angular/forms';
import { RepositoryService } from '../services/repository.service';
import { ToastService } from '../services/toast.service';
import { User } from '../interfaces/interfaces';
import { getDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-newsletter-section',
  templateUrl: './newsletter-section.component.html',
  styleUrls: ['./newsletter-section.component.scss'],
})
export class NewsletterSectionComponent implements OnInit {
  userId: string | null = localStorage.getItem('userId');
  user: User | undefined;

  ngOnInit(): void {
    // this.user = (
    //   await getDoc(
    //     doc(
    //       thi
    //       organisations/${this.organisationId}/settings/general
    //     )
    //   )
    // ).data() as User;
  }
  constructor(
    private repositoryService: RepositoryService,
    private toastService: ToastService
  ) {}

  submitForm() {
    this.repositoryService.usersCollection.doc(this.userId!).update({
      newsletter: true,
    });
    this.toastService.show('Thank you for your interest in our newsletter!');
  }
}
