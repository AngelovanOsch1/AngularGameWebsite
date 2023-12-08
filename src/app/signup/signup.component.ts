import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserCredential } from 'firebase/auth';
import { RepositoryService } from '../services/repository.service';
import { FirebaseFunctionsService } from '../services/firebasefunctions.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [RepositoryService, FirebaseFunctionsService, ToastService],
})
export class SignupComponent {
  constructor(
    private repositoryService: RepositoryService,
    private firebaseFunctionsService: FirebaseFunctionsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.signUpForm.controls['newsletter'].valueChanges.subscribe((val) => {
      if (val) {
        this.signUpForm.controls['newsletter'].setValue(true);
      } else {
        this.signUpForm.controls['newsletter'].setValue(false);
      }
    });
  }

  userCredentials?: UserCredential | null;
  signUpForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
      newsletter: new FormControl(false),
    },
    { validators: this.passwordsMatchValidator.bind(this) }
  );

  getError(name: string) {
    const field = this.signUpForm.get(name);
    let error: string;

    if (field!.touched || !field!.pristine) {
      if (field!.hasError('required')) {
        error = 'Dit veld is verplicht';
      }
    }
    return error! as string;
  }

  passwordsMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (password?.value === repeatPassword?.value) {
      return null;
    } else {
      return { passwordsNotMatch: true };
    }
  }

  async submitForm() {
    if (this.signUpForm.invalid) {
      return this.signUpForm.markAllAsTouched();
    }

    const username: string = this.signUpForm.controls['username'].value.trim();
    const emailAddress: string =
      this.signUpForm.controls['emailAddress'].value.trim();
    const password: string = this.signUpForm.controls['password'].value.trim();
    const repeatPassword: string =
      this.signUpForm.controls['repeatPassword'].value.trim();

    const newsletter: boolean = this.signUpForm.controls['newsletter'].value;

    if (password !== repeatPassword) {
      this.toastService.show('Wachtwoorden komen niet overheen.');
      return;
    }

    this.userCredentials = await this.firebaseFunctionsService.createUser(
      emailAddress,
      password
    );

    if (this.userCredentials) {
      this.repositoryService.usersCollection
        .doc(this.userCredentials.user.uid)
        .set({
          username: username,
          emailAddress: emailAddress,
          newsletter: newsletter,
          isOnline: false,
          role: 'user',
          profilePhoto: '',
        });
    }
  }
}
