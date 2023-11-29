import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserCredential } from 'firebase/auth';
import { createUser } from '../firebase/firebase_functions';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
  providers: [RepositoryService],
})
export class SignupComponent {
  constructor(private repositoryService: RepositoryService) {}

  userCredentials?: UserCredential;
  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
  });

  async submitForm() {
    if (this.signUpForm.invalid) {
      return this.signUpForm.markAllAsTouched();
    }

    const username: string = this.signUpForm.controls['username'].value;
    const emailAddress: string = this.signUpForm.controls['emailAddress'].value;
    const password: string = this.signUpForm.controls['password'].value;
    const repeatPassword: string =
      this.signUpForm.controls['repeatPassword'].value;

    if (password !== repeatPassword) {
      return;
    }

    this.userCredentials = await createUser(emailAddress, password);

    if (this.userCredentials == null) {
      return;
    } else {
      this.repositoryService
        .getUsersCollection()
        .doc(this.userCredentials.user.uid)
        .set({
          username: username,
          emailAddress: emailAddress,
        });
    }
  }
}
