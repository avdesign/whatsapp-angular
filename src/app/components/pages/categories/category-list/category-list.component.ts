import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { Category } from '../../../../models';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryEditService } from './category-edit-service';
import { CategoryCreateService } from './category-create-service';
import { CategoryDeleteService } from './category-delete-service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {

  categories: Array<Category> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  sortColumn = {column: 'created_at', sort: 'desc'};

  @ViewChild(CategoryCreateComponent) categoryCreate: CategoryCreateComponent;
  @ViewChild(CategoryEditComponent) categoryEdit: CategoryEditComponent;
  @ViewChild(CategoryDeleteComponent) categoryDelete: CategoryDeleteComponent;
  
  categoryId:  number;
  searchText: string;

  constructor(private categoryHttp:CategoryHttpService,
              protected CategoryEditService: CategoryEditService,
              protected CategoryCreateService: CategoryCreateService,
              protected CategoryDeleteService: CategoryDeleteService) { 
      this.CategoryEditService.categoryListComponent = this;
      this.CategoryCreateService.categoryListComponent = this;
      this.CategoryDeleteService.categoryListComponent = this;
    }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn
    })
        .subscribe(response => {
          this.categories = response.data,
              this.pagination.totalItems = response.meta.total,
              this.pagination.itemsPerPage = response.meta.per_page
        });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getCategories();
  }

  search(search){
    this.searchText = search;
    this.getCategories();
  }

  sort(sortColumn){
    this.getCategories();
  }

}
