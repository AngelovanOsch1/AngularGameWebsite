import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMenu } from './chat-menu.component';
import { AppModule } from '../app.module';

describe('ComponentNameComponent', () => {
  let component: ChatMenu;
  let fixture: ComponentFixture<ChatMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMenu ],
      imports: [ AppModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
