import { TestBed } from '@angular/core/testing';

import { ChangepageService } from './changepage.service';

describe('ChangepageService', () => {
  let service: ChangepageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangepageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
