import { Component } from '@angular/core';

@Component({
  selector: 'app-authfooter',
  templateUrl: './authfooter.component.html',
  styleUrls: ['./authfooter.component.scss'],
})
export class AuthfooterComponent {
  currentYear: number = new Date().getFullYear();
}
