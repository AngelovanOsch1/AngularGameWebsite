import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { AppModule } from 'src/app/app.module';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      imports: [ AppModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;

    // Use whenStable to wait for component initialization
    fixture.whenStable().then(() => {
      component.user = {
        id: '1',
        emailAddress: 'test@example.com',
        isOnline: true,
        newsletter: true,
        role: 'user',
        username: 'testUser' // Ensure username is properly initialized
      }; 

      fixture.detectChanges(); // Trigger change detection
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
