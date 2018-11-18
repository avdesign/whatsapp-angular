import { Component, OnInit, ViewChild, Output, EventEmitter, Input  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../../../models';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})

export class CategoryEditComponent implements OnInit {

  _categoryId: number;

  form: FormGroup;

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: '',
      active: true
    });
  }

  ngOnInit() {
  }

  @Input()
  set categoryId(value){
    this._categoryId = value;
    if (this._categoryId) {
      this.categoryHttp
        .get(this._categoryId)
        .subscribe(category => this.form.patchValue(category))    
    }
  }

  
  submit(){
    this.categoryHttp
      .update(this._categoryId, this.form.value)
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
