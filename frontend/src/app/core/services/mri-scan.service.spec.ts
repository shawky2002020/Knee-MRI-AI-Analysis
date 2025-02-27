import { TestBed } from '@angular/core/testing';

import { MriScanService } from './mri-scan.service';

describe('MriScanService', () => {
  let service: MriScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MriScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
