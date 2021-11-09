import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CalendarserviceService } from './calendarservice.service';

describe('CalendarserviceService', () => {
  let service: CalendarserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CalendarserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
