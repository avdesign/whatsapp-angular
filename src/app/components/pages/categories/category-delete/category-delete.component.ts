import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { Category } from '../../../../models';

@Component({
  selector: 'category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  category: Category = null;

  _categoryId: null; 

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


  constructor(private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }


  @Input()
  set categoryId(value){
    this._categoryId = value;
    if (this._categoryId) {
      this.categoryHttp
        .get(this._categoryId)
        .subscribe(category => this.category = category)      
    }
  }


  destroy(){
    this.categoryHttp
      .destroy(this._categoryId)
      .subscribe((category) => {
        this.onSuccess.emit(category);
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
