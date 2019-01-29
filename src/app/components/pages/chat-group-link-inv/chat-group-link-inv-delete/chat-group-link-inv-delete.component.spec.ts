import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvDeleteComponent } from './chat-group-link-inv-delete.component';

describe('ChatGroupLinkInvDeleteComponent', () => {
  let component: ChatGroupLinkInvDeleteComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
