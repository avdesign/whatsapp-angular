import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { User } from '../../../../models';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserHttpService } from '../../../../services/http/user-http.service';
import { UserEditService } from './user-edit-service';
import { UserCreateService } from './user-create-service';
import { UserDeleteService } from './user-delete-service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  @ViewChild(UserCreateComponent) userCreate: UserCreateComponent;
  @ViewChild(UserEditComponent) userEdit: UserEditComponent;
  @ViewChild(UserDeleteComponent) userDelete: UserDeleteComponent;
  
  userId:  number;

  constructor(private userHttp:UserHttpService,
              protected UserEditService: UserEditService,
              protected UserCreateService: UserCreateService,
              protected UserDeleteService: UserDeleteService) { 
      this.UserEditService.userListComponent = this;
      this.UserCreateService.userListComponent = this;
      this.UserDeleteService.userListComponent = this;
    }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userHttp.list({page: this.pagination.page})
      .subscribe( response => {
        this.users = response.data,
        this.pagination.totalItems = response.meta.total,
        this.pagination.itemsPerPage = response.meta.per_page
      });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getUsers();
  }
}
