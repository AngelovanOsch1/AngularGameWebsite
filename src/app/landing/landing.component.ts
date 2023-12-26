import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  activeIndex: number | null = null;
  ngOnInit(): void {
    // Set the first item as active initially
    this.activeIndex = 0;
  }
  setActive(index: number): void {
    if (this.activeIndex === index) {
      // Clicked on the active item again, remove the active state
      this.activeIndex = null;
    } else {
      // Clicked on a different item, toggle the active state
      this.activeIndex = index;
    }
  }
}
