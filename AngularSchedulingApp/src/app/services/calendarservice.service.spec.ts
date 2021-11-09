import { TestBed } from '@angular/core/testing';

import { CalendarserviceService } from './calendarservice.service';

describe('CalendarserviceService', () => {
  let service: CalendarserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
