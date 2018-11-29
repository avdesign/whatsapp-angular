
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../../chat-groups/chat-group-form/chat-group-fields-options';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { ChatGroupHttpService } from './../../../../services/http/chat-group-http.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'chat-group-create',
  templateUrl: './chat-group-create.component.html',
  styleUrls: ['./chat-group-create.component.css']
})
export class ChatGroupCreateComponent implements OnInit {

  form: FormGroup;
  errors = {};

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private chatGroupHttp: ChatGroupHttpService,
              private formBuilder: FormBuilder) {
    const maxLength = fieldsOptions.name.validationMessage.maxLength;
    this.form = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(maxLength)]],
      'photo': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  submit(){
    this.chatGroupHttp
      .create(this.form.value)
      .subscribe((chatGroup) => {
        this.form.reset({
          name: ''
        });
        this.onSuccess.emit(chatGroup);
        this.modal.hide();
      }, responseError =>  {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError);      
      });  
  }


  showModal(){
    this.modal.show();
  }

  showErrors(){
    return Object.keys(this.errors).length != 0;
  }


  hideModal($event){
    // fazer algo quando model for fechado
    //console.log($event);
  }


}
