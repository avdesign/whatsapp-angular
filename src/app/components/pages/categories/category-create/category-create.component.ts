import { Component, OnInit, ViewChild  } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category = {
    name: ''
  }

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submit(){
    const token = window.localStorage.getItem('token');
    console.log(token);
    this.http.post('http://whatsapp.test/api/categories', this.category, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
    .subscribe((category) => {
      //console.log(category);
      //this.getCategories();
      this.modal.hide();

    });
  }


  showModal(){
    this.modal.show();
  }


  hideModal($event){
    // fazer algo quando model for fechado
    //console.log($event);
  }

}
