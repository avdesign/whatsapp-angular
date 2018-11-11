import { Component, OnInit, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from '../../../../services/http/product-http.service';
import { Product } from '../../../../models';

@Component({
  selector: 'product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = null;

  _productId: null; 

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


  constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {
  }


  @Input()
  set productId(value){
    this._productId = value;
    if (this._productId) {
      this.productHttp
        .get(this._productId)
        .subscribe(product => this.product = product)      
    }
  }


  destroy(){
    this.productHttp
      .destroy(this._productId)
      .subscribe((product) => {
        this.onSuccess.emit(product);
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
