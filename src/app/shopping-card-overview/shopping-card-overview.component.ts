import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-card-overview',
  templateUrl: './shopping-card-overview.component.html',
  styleUrls: ['./shopping-card-overview.component.scss'],
})
export class ShoppingCardOverviewComponent {
  @Input() totalPrice: number = 0;
  @Input() totalItems: number = 0;
}
