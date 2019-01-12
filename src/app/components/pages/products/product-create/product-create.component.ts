import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { ProductHttpService } from '../../../../services/http/product-http.service';
import { Product } from '../../../../models';

@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    active: true
  }

  errors = {};

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  submit(){
    this.productHttp
      .create(this.product)
      .subscribe((product) => {
        this.onSuccess.emit(product);
        this.modal.hide();
      }, responseError => {
        if(responseError.status === 422 ){
            this.errors = responseError.error.errors;
            console.log(this.errors);
        }
        this.onError.emit(responseError)
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