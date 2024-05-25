import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsletterSectionComponent } from './newsletter-section.component';
import { AppModule } from '../app.module';

describe('ComponentNameComponent', () => {
  let component: NewsletterSectionComponent;
  let fixture: ComponentFixture<NewsletterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterSectionComponent ],
      imports: [ AppModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
