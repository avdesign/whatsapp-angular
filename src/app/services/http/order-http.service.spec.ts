import { TestBed, inject } from '@angular/core/testing';

import { OrderHttpService } from './order-http.service';

describe('OrderHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderHttpService]
    });
  });

  it('should be created', inject([OrderHttpService], (service: OrderHttpService) => {
    expect(service).toBeTruthy();
  }));
});
