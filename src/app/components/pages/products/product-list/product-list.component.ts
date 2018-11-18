import { Component, OnInit, ViewChild } from '@angular/core';

import { ProductHttpService } from '../../../../services/http/product-http.service';
import { Product } from '../../../../models';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductEditService } from './product-edit-service';
import { ProductCreateService } from './product-create-service';
import { ProductDeleteService } from './product-delete-service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  products: Array<Product> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  sortColumn = {column: 'created_at', sort: 'desc'};

  @ViewChild(ProductCreateComponent) productCreate: ProductCreateComponent;
  @ViewChild(ProductEditComponent) productEdit: ProductEditComponent;
  @ViewChild(ProductDeleteComponent) productDelete: ProductDeleteComponent;
  
  productId:  number;
  searchText: string;

  constructor(private productHttp:ProductHttpService,
              protected ProductEditService: ProductEditService,
              protected ProductCreateService: ProductCreateService,
              protected ProductDeleteService: ProductDeleteService) { 
    this.ProductEditService.productListComponent = this;
    this.ProductCreateService.productListComponent = this;
    this.ProductDeleteService.productListComponent = this;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe( response => {
        this.products = response.data,
        this.pagination.totalItems = response.meta.total,
        this.pagination.itemsPerPage = response.meta.per_page
      });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getProducts();
  }

  sort(sortColumn){
    this.getProducts();
  }

  search(search){
    this.searchText = search;
    this.getProducts();
  }

}