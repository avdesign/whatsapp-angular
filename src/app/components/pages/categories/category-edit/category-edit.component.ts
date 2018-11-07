import { Component, OnInit, ViewChild, Output, EventEmitter, Input  } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';

@Component({
  selector: 'category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category = {
    name: ''
  }

  _categoryId: number; 

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  @Input()
  set categoryId(value){
    this._categoryId = value;
    if (this._categoryId) {
      const token = window.localStorage.getItem('token');
      this.http.get<{data: any}>(`http://whatsapp.test/api/categories/${value}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .subscribe( response => {this.category = response.data});
    }

  }


  submit(){
    const token = window.localStorage.getItem('token');
    //console.log(token);
    this.http.put(`http://whatsapp.test/api/categories/${this._categoryId}`, this.category, {
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
