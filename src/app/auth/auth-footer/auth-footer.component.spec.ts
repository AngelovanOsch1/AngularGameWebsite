import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthfooterComponent } from './auth-footer.component';

describe('AuthfooterComponent', () => {
  let component: AuthfooterComponent;
  let fixture: ComponentFixture<AuthfooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthfooterComponent]
    });
    fixture = TestBed.createComponent(AuthfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
