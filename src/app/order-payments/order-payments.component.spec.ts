import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPaymentsComponent } from './order-payments.component';
import { AppModule } from '../app.module';

describe('ComponentNameComponent', () => {
  let component: OrderPaymentsComponent;
  let fixture: ComponentFixture<OrderPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPaymentsComponent ],
      imports: [ AppModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
