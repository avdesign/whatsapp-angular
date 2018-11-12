import { TestBed, inject } from '@angular/core/testing';

import { RefereshTokenInterceptorService } from './referesh-token-interceptor.service';

describe('RefereshTokenInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefereshTokenInterceptorService]
    });
  });

  it('should be created', inject([RefereshTokenInterceptorService], (service: RefereshTokenInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
