import { ChatGroupHttpService } from './../../../../services/http/chat-group-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { ChatGroup } from './../../../../models';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'chat-group-delete',
  templateUrl: './chat-group-delete.component.html',
  styleUrls: ['./chat-group-delete.component.css']
})
export class ChatGroupDeleteComponent implements OnInit {

  chatGroup: ChatGroup = null;
  _chatGroupId: null;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent) modal: ModalComponent;


  constructor(private chatGroupHttp: ChatGroupHttpService) { }

  ngOnInit() {
  }


  @Input()
  set chatGroupId(value){
    this._chatGroupId = value;
    if (this._chatGroupId) {
      this.chatGroupHttp
        .get(this._chatGroupId)
        .subscribe(chatGroup => this.chatGroup = chatGroup)      
    }
  }


  destroy(){
    this.chatGroupHttp
      .destroy(this._chatGroupId)
      .subscribe((chatGroup) => {
        this.onSuccess.emit(chatGroup);
        this.modal.hide();
      }, error =>  this.onError.emit(error));
  }

  showModal(){
    this.modal.show();
  }


  hideModal($event){
    // fazer algo quando model for fechado
    //console.log($event);
  }

}
