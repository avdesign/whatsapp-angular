import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { User } from '../../../../models';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDeleteService } from '../user-list/user-delete-service';
import { UserHttpService } from '../../../../services/http/user-http.service';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    password: ''
  }

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private userHttp: UserHttpService) { }

  ngOnInit() {
  }

  submit(){
    this.userHttp
      .create(this.user)
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
