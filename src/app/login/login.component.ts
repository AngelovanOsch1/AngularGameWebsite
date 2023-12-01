import { Component } from '@angular/core';
import { FirebaseFunctions } from '../firebase/firebase_functions';
import { UserCredential } from 'firebase/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FirebaseFunctions],
})
export class LoginComponent {
  constructor(private firebaseFunctions: FirebaseFunctions) {}
  userCredentials?: UserCredential;
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

    this.userCredentials = await this.firebaseFunctions.loginUser(
      emailAddress,
      password
    );
  }
}
