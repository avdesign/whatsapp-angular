import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductInput } from '../../../../models';
import { ProductInputCreateComponent } from '../product-input-create/product-input-create.component';
import { ProductInputHttpService } from '../../../../services/http/product-input-http.service';
import { ProductInputCreateService } from './product-input-create-service';

@Component({
  selector: 'product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {

  inputs: Array<ProductInput> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  sortColumn = {column: 'created_at', sort: 'desc'};

  @ViewChild(ProductInputCreateComponent) inputCreate: ProductInputCreateComponent;
  
  searchText: string;

  constructor(private inputHttp:ProductInputHttpService,
              protected productInputCreateService: ProductInputCreateService) {
      this.productInputCreateService.productInputListComponent = this;  
      
    }

  ngOnInit() {
    this.getInputs();
  }

  getInputs() {
    this.inputHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
    .subscribe(response => {
      this.inputs = response.data,
        this.pagination.totalItems = response.meta.total,
        this.pagination.itemsPerPage = response.meta.per_page
    });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getInputs();
  }

  sort(sortColumn){
    this.getInputs();
  }


  search(search){
    //console.log(search);
    this.searchText = search;
    this.getInputs();
  }
}