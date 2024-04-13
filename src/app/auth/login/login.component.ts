import { Component } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
import { FirebaseFunctionsService } from '../../services/firebasefunctions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [RepositoryService, FirebaseFunctionsService],
})
export class LoginComponent {
  userCredentials?: UserCredential | null;
  constructor(
    private firebaseFunctionsService: FirebaseFunctionsService,
    private repositoryService: RepositoryService,
    private router: Router
  ) {}
  loginForm: FormGroup = new FormGroup({
    emailAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  getError(name: string) {
    const field = this.loginForm.get(name);
    let error: string;

    if (field!.touched || !field!.pristine) {
      if (field!.hasError('required')) {
        error = 'Dit veld is verplicht';
      }
    }
    return error! as string;
  }

  async login() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    const emailAddress: string =
      this.loginForm.controls['emailAddress'].value.trim();
    const password: string = this.loginForm.controls['password'].value.trim();

    this.userCredentials = await this.firebaseFunctionsService.loginUser(
      emailAddress,
      password
    );

    if (this.userCredentials) {
      this.repositoryService.usersCollection
        .doc(this.userCredentials?.user.uid)
        .update({
          isOnline: true,
        });

      this.router.navigate(['/']);
    }
  }
}
