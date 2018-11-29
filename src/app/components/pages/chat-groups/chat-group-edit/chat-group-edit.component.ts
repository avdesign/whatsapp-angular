
import { Component, OnInit, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroup } from './../../../../models';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { ChatGroupHttpService } from './../../../../services/http/chat-group-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../../chat-groups/chat-group-form/chat-group-fields-options';




@Component({
  selector: 'chat-group-edit',
  templateUrl: './chat-group-edit.component.html',
  styleUrls: ['./chat-group-edit.component.css']
})
export class ChatGroupEditComponent implements OnInit {


  _chatGroupId: number;
  _chatGroupPhotoUrl: string;
  chatGroup:ChatGroup;
  form: FormGroup;
  errors = {};


  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent) modal: ModalComponent;

  constructor(private chatGroupHttp: ChatGroupHttpService, 
              private formBuilder: FormBuilder) {
   const maxLength = fieldsOptions.name.validationMessage.maxLength;
   this.form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(maxLength)]],
    photo: null
   });            
  }

  ngOnInit() {
  }

  @Input()
  set chatGroupId(value){
    if (!value) return;
    this._chatGroupId = value;
    //console.log(this._chatGroupId);
    if (this._chatGroupId) {
      this.chatGroupHttp
        .get(this._chatGroupId)
        .subscribe(chatGroup => {
          this.chatGroup = chatGroup;
          this.form.patchValue(chatGroup)
        }, responseError => {
          if (responseError.status === 401) {
            this.modal.hide();
          }
        })      
    }
  }

  /**
   * Carrega a imagem do grupo
   */
  @Input()
  set chatGroupPhotoUrl(value){
    //this._chatGroupPhotoUrl = value;
    //console.log(this._chatGroupPhotoUrl);
  }

  
  submit(){
    this.chatGroupHttp
      .update(this._chatGroupId, this.form.value)
      .subscribe((chatGroup) => {
        this.onSuccess.emit(chatGroup);
        this.modal.hide();
      }, responseError =>  {
        if (responseError.status === 401) {
          this.errors = responseError.menssage;
        }
        this.onError.emit(responseError);      
      }); 
      //console.log(this._chatGroupPhotoUrl);
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
