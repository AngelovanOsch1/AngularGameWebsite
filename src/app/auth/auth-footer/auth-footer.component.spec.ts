import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthfooterComponent } from './auth-footer.component';
import { AppModule } from 'src/app/app.module';

describe('ComponentNameComponent', () => {
  let component: AuthfooterComponent;
  let fixture: ComponentFixture<AuthfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthfooterComponent ],
      imports: [ AppModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
