import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from "../product-input-form/product-input-fields-options";
import { ProductInputFieldsSelect2Service } from './product-input-fielsds-select2.service';
import { Select2Component } from 'ng2-select2';


@Component({
  selector: 'product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

  @Input()
  form: FormGroup;
  /**
   * Pegar referencia do Select2
   */
  @ViewChild(Select2Component, {read: ElementRef})
  select2Element: ElementRef;

  constructor(private changeRef: ChangeDetectorRef,
              public productIdField: ProductInputFieldsSelect2Service) {

  }

  ngOnInit() {
    this.productIdField.make(this.select2Element)
  }

  ngOnChanges(){
    this.changeRef.detectChanges();
  }


  get fieldsOptions(): any {
    return fieldsOptions;
  }

}
