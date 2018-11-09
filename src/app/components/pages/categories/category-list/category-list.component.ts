import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { CategoryInterface } from '../../../../interfaces/categoryInterface';

import { CategoryEditService } from './category-edit-service';
import { CategoryCreateService } from './category-create-service';
import { CategoryDeleteService } from './category-delete-service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<CategoryInterface> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  @ViewChild(CategoryCreateComponent) categoryCreate: CategoryCreateComponent;
  @ViewChild(CategoryEditComponent) categoryEdit: CategoryEditComponent;
  @ViewChild(CategoryDeleteComponent) categoryDelete: CategoryDeleteComponent;
  
  categoryId:  number;

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

  getCategories(){
    this.categoryHttp.list(this.pagination.page)
      .subscribe( response => {
        this.categories = response.data,
        this.pagination.totalItems = response.meta.total,
        this.pagination.itemsPerPage = response.meta.per_page
      });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getCategories();
  }

}
