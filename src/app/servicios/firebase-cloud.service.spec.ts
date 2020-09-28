import { TestBed } from '@angular/core/testing';

import { FirebaseCloudService } from './firebase-cloud.service';

describe('FirebaseCloudService', () => {
  let service: FirebaseCloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
