import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../../../../models';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { UserHttpService } from '../../../../services/http/user-http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  user: User = null;

  _userId: null; 

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


  destroy(){
    this.userHttp
      .destroy(this._userId)
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
