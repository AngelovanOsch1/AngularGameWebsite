import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  userCredentials?: UserCredential | null;
  rememberMe: boolean = false;
  constructor(
    private firebaseFunctionsService: FirebaseFunctionsService,
    private repositoryService: RepositoryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm.controls['rememberMe'].valueChanges.subscribe((value) => {
      this.rememberMe = value;
    });
  }
  loginForm: FormGroup = new FormGroup({
    emailAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
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
    const rememberMe: boolean = this.loginForm.controls['rememberMe'].value;

    this.userCredentials = await this.firebaseFunctionsService.loginUser(
      emailAddress,
      password,
      rememberMe
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
