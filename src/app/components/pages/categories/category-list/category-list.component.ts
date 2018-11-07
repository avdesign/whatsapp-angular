import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CategoryCreateComponent } from '../category-create/category-create.component';


@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];

  @ViewChild(CategoryCreateComponent)
  categoryCreate: CategoryCreateComponent;

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

  showModalInsert(){
    this.categoryCreate.showModal();
  }

  onInsertSuccess($event: any){
    console.log($event);
    this.getCategories();
  }


  onInsertError($event: HttpErrorResponse){
    console.log($event);
  }



 

}
