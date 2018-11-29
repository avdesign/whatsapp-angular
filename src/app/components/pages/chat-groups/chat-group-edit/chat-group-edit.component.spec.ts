import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupEditComponent } from './chat-group-edit.component';

describe('ChatGroupEditComponent', () => {
  let component: ChatGroupEditComponent;
  let fixture: ComponentFixture<ChatGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
