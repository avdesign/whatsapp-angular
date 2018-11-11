import { Component, OnInit, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { User } from '../../../../models';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from '../../../../services/http/user-http.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    password: ''
  }

  _userId: number; 

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


  constructor(private userHttp: UserHttpService) { }

  ngOnInit() {
  }

  @Input()
  set userId(value){
    this._userId = value;
    if (this._userId) {
      this.userHttp
        .get(this._userId)
        .subscribe(user => this.user = user)      
    }
  }

  
  submit(){
    this.userHttp
      .update(this._userId, this.user)
      .subscribe((user) => {
        this.onSuccess.emit(user);
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
