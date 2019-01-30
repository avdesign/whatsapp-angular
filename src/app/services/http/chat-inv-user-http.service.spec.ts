import { TestBed, inject } from '@angular/core/testing';

import { ChatInvUserHttpService } from './chat-inv-user-http.service';

describe('ChatInvUserHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatInvUserHttpService]
    });
  });

  it('should be created', inject([ChatInvUserHttpService], (service: ChatInvUserHttpService) => {
    expect(service).toBeTruthy();
  }));
});
