import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroupLinkInvHttpService } from '../../../../services/http/chat-group-link-inv-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../chat-group-link-inv-form/chat-group-link-inv-fields-options';


@Component({
  selector: 'chat-group-link-inv-create',
  templateUrl: './chat-group-link-inv-create.component.html',
  styleUrls: ['./chat-group-link-inv-create.component.css']
})
export class ChatGroupLinkInvCreateComponent implements OnInit {

  errors = {};
  form: FormGroup;


  @Input()
  groupId: number;

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
 
  constructor(public linkInvHttp: ChatGroupLinkInvHttpService, private formBuilder: FormBuilder) { 
    const min = fieldsOptions.total.validationMessage.mim;
    this.form = this.formBuilder.group({
      total: [min, [Validators.required, Validators.min(min)]],
      expires_at: null,
      remaining: null
    });
  }

  ngOnInit() {
  }

  submit() {
    this.linkInvHttp
        .create(this.groupId, this.form.value)
        .subscribe((linkInv) => {
          this.form.reset({
            total: fieldsOptions.total.validationMessage.min,
            expires_at: null,
            remaining: null
          });        
          this.errors = {};
          this.onSuccess.emit(linkInv);
          this.modal.hide();
        }, responseError => {
           if (responseError.status === 422) {
             this.errors = responseError.error.errors
           }
           this.onError.emit(responseError)
        });
  }

  showModal(){
    this.modal.show();
  }

  showErrors(){
    return Object.keys(this.errors).length != 0;
  }

  hideModal($event: Event){
    //console.log($event);
  }

}
