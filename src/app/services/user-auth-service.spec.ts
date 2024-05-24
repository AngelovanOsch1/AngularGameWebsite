import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserAuthService } from './user-auth-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../interfaces/interfaces';

describe('UserAuthService', () => {
  let service: UserAuthService;
  let afAuthMock: any;
  let firestoreMock: any;

  beforeEach(async () => {
    afAuthMock = {
      authState: of({ uid: '12345' }) // Mock authenticated user
    };

    firestoreMock = {
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          get: jest.fn(() => of({
            id: '12345',
            exists: true,
            data: () => ({
              emailAddress: 'john.doe@example.com',
              isOnline: true,
              newsletter: false,
              profilePhoto: 'http://example.com/photo.jpg',
              role: 'user',
              username: 'johndoe',
              name: 'John Doe' // Include 'name' property
            })
          }))
        }))
      }))
    };

    await TestBed.configureTestingModule({
      providers: [
        UserAuthService,
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    }).compileComponents();

    service = TestBed.inject(UserAuthService);
  });

  it('should return user data when logged in', async () => {
    const expectedUser: User = {
      id: '12345',
      emailAddress: 'john.doe@example.com',
      isOnline: true,
      newsletter: false,
      profilePhoto: 'http://example.com/photo.jpg',
      role: 'user',
      username: 'johndoe',
    };
    
    const user = await service.getLoggedInUser();
    
    expect(user).toEqual(expectedUser);
  });

  it('should return undefined when not logged in', async () => {
    afAuthMock.authState = of(null); // Mock not authenticated

    const user = await service.getLoggedInUser();
    
    expect(user).toBeUndefined();
  });
});
