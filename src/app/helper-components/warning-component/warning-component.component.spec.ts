import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningComponentComponent } from './warning-component.component';

describe('WarningComponentComponent', () => {
  let component: WarningComponentComponent;
  let fixture: ComponentFixture<WarningComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningComponentComponent]
    });
    fixture = TestBed.createComponent(WarningComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
