import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../models';
import { OrderHttpService } from '../../../../services/http/order-http.service';


@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Array<Order> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  sortColumn = {column: 'created_at', sort: 'desc'};

 // @ViewChild(CategoryCreateComponent) categoryCreate: CategoryCreateComponent;
 // @ViewChild(CategoryEditComponent) categoryEdit: CategoryEditComponent;
  //@ViewChild(CategoryDeleteComponent) categoryDelete: CategoryDeleteComponent;
  
  searchText: string;

  constructor(private orderHttp: OrderHttpService){

  }

  /*
  constructor(private categoryHttp:CategoryHttpService,
              protected CategoryEditService: CategoryEditService,
              protected CategoryCreateService: CategoryCreateService,
              protected CategoryDeleteService: CategoryDeleteService) { 
                
      this.CategoryEditService.categoryListComponent = this;
      this.CategoryCreateService.categoryListComponent = this;
      this.CategoryDeleteService.categoryListComponent = this;
    }
  */

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
        .subscribe(response => {
          this.orders = response.data,
              this.pagination.totalItems = response.meta.total,
              this.pagination.itemsPerPage = response.meta.per_page
        });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getOrders();
  }

  sort(sortColumn){
    this.getOrders();
  }


  search(search){
    //console.log(search);
    this.searchText = search;
    this.getOrders();
  }
  

}
