import { TestBed, inject } from '@angular/core/testing';

import { ChatGroupLinkInvHttpService } from './chat-group-link-inv-http.service';

describe('ChatGroupLinkInvHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatGroupLinkInvHttpService]
    });
  });

  it('should be created', inject([ChatGroupLinkInvHttpService], (service: ChatGroupLinkInvHttpService) => {
    expect(service).toBeTruthy();
  }));
});
