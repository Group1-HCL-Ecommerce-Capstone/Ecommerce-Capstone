import { TestBed } from '@angular/core/testing';

import { UserRegService } from './userReg.service';

describe('UserRegService', () => {
  let service: UserRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
