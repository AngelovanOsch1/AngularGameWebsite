import { Component } from '@angular/core';

@Component({
  selector: 'app-authfooter',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss'],
})
export class AuthfooterComponent {
  currentYear: number = new Date().getFullYear();
}
