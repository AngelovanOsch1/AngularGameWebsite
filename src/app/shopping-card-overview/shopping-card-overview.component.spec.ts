import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCardOverviewComponent } from './shopping-card-overview.component';

describe('ShoppingCardOverviewComponent', () => {
  let component: ShoppingCardOverviewComponent;
  let fixture: ComponentFixture<ShoppingCardOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCardOverviewComponent]
    });
    fixture = TestBed.createComponent(ShoppingCardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
