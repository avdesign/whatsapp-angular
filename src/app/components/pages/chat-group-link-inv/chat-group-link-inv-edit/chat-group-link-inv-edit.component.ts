import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroupLinkInvHttpService } from '../../../../services/http/chat-group-link-inv-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../chat-group-link-inv-form/chat-group-link-inv-fields-options';


@Component({
  selector: 'chat-group-link-inv-edit',
  templateUrl: './chat-group-link-inv-edit.component.html',
  styleUrls: ['./chat-group-link-inv-edit.component.css']
})

export class ChatGroupLinkInvEditComponent implements OnInit {

  _groupId: number;
  _linkInv: number;

  form: FormGroup;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent) modal: ModalComponent;


 
  constructor(public linkInvHttp: ChatGroupLinkInvHttpService, private formBuilder: FormBuilder) { 
    const min = fieldsOptions.total.validationMessage.maxLength;
    this.form = this.formBuilder.group({
      total: [min, [Validators.required, Validators.min(min)]],
      expires_at: null,
      remaining: null
    });

    console.log(fieldsOptions);
  }

  ngOnInit() {
  }

  @Input()
  set groupId(value){
    this._groupId = value;
    this.getLinkInvitation();
  }

  @Input()
  set linkInvId(value){
    this._linkInv = value;
    this.getLinkInvitation();
  }



  getLinkInvitation(){
    if (this._groupId && this._linkInv) {
      //comsole.log(this._linkInv);
      this.linkInvHttp
          .get(this._groupId, this._linkInv)
          .subscribe(linkInv => {
            const data:any = linkInv;
            data.expires_at = data.expires_at ? data.expires_at.date.substring(0,10) : null;
            console.log(data);
            this.form.patchValue(data);
          }, responseError => {
            if (responseError.status == 401) {
              this.modal.hide();
            }
          });
    }
  }

  submit() {
    this.linkInvHttp
        .update(this._groupId, this._linkInv, this.form.value)
        .subscribe((linkInv) => {
          this.form.reset({
            total: fieldsOptions.total.validationMessage.min,
            expires_at: null,
            remaining: null
          });        
          this.onSuccess.emit(linkInv);
          this.modal.hide();
        }, error => this.onError.emit(error));
  }

  showModal(){
    this.modal.show();
  }

  hideModal($event: Event){
    //console.log($event);
  }

}