import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterSectionComponent } from './newsletter-section.component';

describe('NewsletterSectionComponent', () => {
  let component: NewsletterSectionComponent;
  let fixture: ComponentFixture<NewsletterSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsletterSectionComponent]
    });
    fixture = TestBed.createComponent(NewsletterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
