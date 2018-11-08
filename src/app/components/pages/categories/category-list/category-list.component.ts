import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';


@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];

  @ViewChild(CategoryCreateComponent) categoryCreate: CategoryCreateComponent;
  @ViewChild(CategoryEditComponent) categoryEdit: CategoryEditComponent;
  @ViewChild(CategoryDeleteComponent) categoryDelete: CategoryDeleteComponent;
  
  categoryId:  number;

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {
    this.getCategories();
  }


  getCategories(){
    const token = window.localStorage.getItem('token');
    this.http.get<{data:Array<any>}>('http://whatsapp.test/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
      .subscribe( response => {
        //response.data[0].active = false;
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
