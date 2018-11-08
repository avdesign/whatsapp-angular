import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';

@Component({
  selector: 'category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  category = null;

  _categoryId: null; 

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


  destroy(){
    const token = window.localStorage.getItem('token');
    this.http.delete(`http://whatsapp.test/api/categories/${this._categoryId}`, {
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
