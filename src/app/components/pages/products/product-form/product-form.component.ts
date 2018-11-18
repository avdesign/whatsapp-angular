import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../models';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input()
  product: Product = {
    name: '',
    description: '',
    price: 0,
    active: true
  }

  constructor() { }

  ngOnInit() {
  }

}
