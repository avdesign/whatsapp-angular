import { Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { Category } from '../../../../models';


@Component({
  selector: 'category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category: Category = {
    name: '',
    active: true
  }

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }

  submit(){
    this.categoryHttp
      .create(this.category)
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
