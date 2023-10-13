import { TestBed } from '@angular/core/testing';

import { EvenDriverService } from './even-driver.service';

describe('EvenDriverService', () => {
  let service: EvenDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
