import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCommentsComponent } from './user-comments.component';
import { AppModule } from '../app.module';

describe('UserCommentsComponent', () => {
  let component: UserCommentsComponent;
  let fixture: ComponentFixture<UserCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommentsComponent ],
      imports: [ AppModule ],
    })
    .compileComponents();

    // Create component and assign user object
    fixture = TestBed.createComponent(UserCommentsComponent);
    component = fixture.componentInstance;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
