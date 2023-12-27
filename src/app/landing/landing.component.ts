import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  activeIndex: number = 1;
  setActive(index: number) {
    this.activeIndex = index;
  }
}
