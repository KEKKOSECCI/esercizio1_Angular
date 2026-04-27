import { TestBed } from '@angular/core/testing';

import { Heroservice } from './heroservice';

describe('Heroservice', () => {
  let service: Heroservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Heroservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
