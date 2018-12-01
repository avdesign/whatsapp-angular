import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupUserCreateComponent } from './chat-group-user-create.component';

describe('ChatGroupUserCreateComponent', () => {
  let component: ChatGroupUserCreateComponent;
  let fixture: ComponentFixture<ChatGroupUserCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupUserCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
