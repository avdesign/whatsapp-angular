import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ChatGroupLinkInvitation } from '../../../../models';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroupLinkInvHttpService } from '../../../../services/http/chat-group-link-inv-http.service';



@Component({
  selector: 'chat-group-link-inv-delete',
  templateUrl: './chat-group-link-inv-delete.component.html',
  styleUrls: ['./chat-group-link-inv-delete.component.css']
})
export class ChatGroupLinkInvDeleteComponent implements OnInit {

  linkInv: ChatGroupLinkInvitation = null;

  _groupId: number;
  _linkInvId: number;

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


  constructor(private linkInvHttp: ChatGroupLinkInvHttpService) { }

  ngOnInit() {
  }

  @Input()
  set groupId(value) {
    this._groupId = value;
    this.getLinkInvitation();
  }


  @Input()
  set linkInvId(value) {
    this._linkInvId = value;
    this.getLinkInvitation();
  }

  getLinkInvitation() {
    if (this._groupId && this._linkInvId) {
      this.linkInvHttp
          .get(this._groupId, this._linkInvId)
          .subscribe(linkInv => {
            this.linkInv = linkInv;
          })
    }
  }

  destroy() {
    this.linkInvHttp
        .destroy(this._groupId, this._linkInvId)
        .subscribe(() => {
          this.onSuccess.emit(true);
          this.modal.hide();
        }, error => this.onError.emit(error));
  }

  showModal(){
    this.modal.show();
  }


  hideModal($event){
    // fazer algo quando model for fechado
    //console.log($event);
  }




}
