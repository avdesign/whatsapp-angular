import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvCreateComponent } from './chat-group-link-inv-create.component';

describe('ChatGroupLinkInvCreateComponent', () => {
  let component: ChatGroupLinkInvCreateComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
