import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvEditComponent } from './chat-group-link-inv-edit.component';

describe('ChatGroupLinkInvEditComponent', () => {
  let component: ChatGroupLinkInvEditComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
