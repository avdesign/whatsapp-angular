import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { CategoryInterface } from '../../../../interfaces/categoryInterface';


@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<CategoryInterface> = [];

  @ViewChild(CategoryCreateComponent) categoryCreate: CategoryCreateComponent;
  @ViewChild(CategoryEditComponent) categoryEdit: CategoryEditComponent;
  @ViewChild(CategoryDeleteComponent) categoryDelete: CategoryDeleteComponent;
  
  categoryId:  number;

  constructor(public categoryHttp:CategoryHttpService) { }

  ngOnInit() {
    this.getCategories();
  }


  getCategories(){
    this.categoryHttp.list()
      .subscribe( response => {
        this.categories = response.data
      });
  }

  showModalCreate(){
    this.categoryCreate.showModal();
  }

  showModalEdit(categoryId: number){
    this.categoryId = categoryId;
    this.categoryEdit.showModal();
  }

  showModalDelete(categoryId: number){
    this.categoryId = categoryId;
    this.categoryDelete.showModal();
  }


  onCreateSuccess($event: any){
    //console.log($event);
    this.getCategories();
  }


  onCreateError($event: HttpErrorResponse){
    //console.log($event);
  }


  onEditSuccess($event: any){
    //console.log($event);
    this.getCategories();
  }


  onEditError($event: HttpErrorResponse){
    //console.log($event);
  }

  onDeleteSuccess($event: any){
    //console.log($event);
    this.getCategories();
  }


  onDeleteError($event: HttpErrorResponse){
    //console.log($event);
  }

  




 

}
