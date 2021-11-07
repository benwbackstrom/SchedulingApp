import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MapserviceService } from './mapservice.service';

describe('MapserviceService', () => {
  let service: MapserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MapserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
