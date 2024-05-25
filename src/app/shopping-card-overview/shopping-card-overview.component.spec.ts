import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCardOverviewComponent } from './shopping-card-overview.component';
import { AppModule } from '../app.module';

describe('ComponentNameComponent', () => {
  let component: ShoppingCardOverviewComponent;
  let fixture: ComponentFixture<ShoppingCardOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCardOverviewComponent ],
      imports: [ AppModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
