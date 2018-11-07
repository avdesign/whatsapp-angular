import { Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category = {
    name: ''
  }

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submit(){
    const token = window.localStorage.getItem('token');
    //console.log(token);
    this.http.post('http://whatsapp.test/api/categories', this.category, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
    .subscribe((category) => {
      this.onSuccess.emit(category);
      this.modal.hide();
      //console.log(category);
      //this.getCategories();
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
