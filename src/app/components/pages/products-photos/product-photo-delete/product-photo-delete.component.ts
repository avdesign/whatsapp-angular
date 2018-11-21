import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductPhotoHttpService } from '../../../../services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-photo-delete',
  templateUrl: './product-photo-delete.component.html',
  styleUrls: ['./product-photo-delete.component.css']
})
export class ProductPhotoDeleteComponent implements OnInit {

  errors = {};
  productId: number;

  @Input()
  photoId: number;

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(public productPhotoHttp: ProductPhotoHttpService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.productId = params.product;
      });
  }

  deletePhoto() {
    this.productPhotoHttp
    .destroy(this.productId, this.photoId)
    .subscribe((data) => this.onSuccess.emit(data),
        (responseError) => {
            if (responseError.status === 422) {
                this.errors = responseError.error.errors;
            }
            this.onError.emit(responseError);
        });
  }

  showModal(){
    this.modal.show();
  }

  hideModal(){
    this.modal.hide();
  }


  showErros(){
    return Object.keys(this.errors).length !=0;
  }

}
