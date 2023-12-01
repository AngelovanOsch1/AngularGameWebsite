import { TestBed } from '@angular/core/testing';

import { FirebasefunctionsService } from './firebasefunctions.service';

describe('FirebasefunctionsService', () => {
  let service: FirebasefunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebasefunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
