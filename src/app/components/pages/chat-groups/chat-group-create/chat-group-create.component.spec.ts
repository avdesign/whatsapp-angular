import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupCreateComponent } from './chat-group-create.component';

describe('ChatGroupCreateComponent', () => {
  let component: ChatGroupCreateComponent;
  let fixture: ComponentFixture<ChatGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
