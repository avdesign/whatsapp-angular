import { Component, OnInit, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { ProductInput } from '../../../../models';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInputHttpService } from '../../../../services/http/product-input-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {default as productInputFieldsOptions} from "../product-input-form/product-input-fields-options";


@Component({
  selector: 'product-input-create',
  templateUrl: './product-input-create.component.html',
  styleUrls: ['./product-input-create.component.css']
})
export class ProductInputCreateComponent implements OnInit {

  form: FormGroup;
  @Input()
  errors = {};

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(public inputHttp: ProductInputHttpService, private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group( {
        amount: ['', [Validators.required, Validators.min(productInputFieldsOptions.amount.validationMessage.min)]]
      });
  }

  

  ngOnInit() {
  }

  submit() {
    this.inputHttp
      .create(this.form.value)
      .subscribe((input) => {
        this.form.reset({
          amount: ''
        });
        this.onSuccess.emit(input);
        this.modal.hide();
      }, (responseError) => {
        if(responseError.status === 422 ){
          this.errors = responseError.error.errors;
          console.log(this.errors);
        }
        this.onError.emit(responseError);
      });
  }


  showModal() {
      this.modal.show();
      // setTimeout(() => {this.modal.hide();}, 30000)
  }

  showErrors(){
      return Object.keys(this.errors).length != 0;

  }

  hideModal($event: Event) {
      console.log($event);
  }

}
