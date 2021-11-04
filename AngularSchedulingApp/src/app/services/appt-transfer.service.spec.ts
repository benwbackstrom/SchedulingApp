import { TestBed } from '@angular/core/testing';

import { ApptTransferService } from './appt-transfer.service';

describe('ApptTransferService', () => {
  let service: ApptTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApptTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
