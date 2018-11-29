import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupDeleteComponent } from './chat-group-delete.component';

describe('ChatGroupDeleteComponent', () => {
  let component: ChatGroupDeleteComponent;
  let fixture: ComponentFixture<ChatGroupDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
