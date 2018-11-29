import { ChatGroupEditService } from './chat-group-edit-service';
import { ChatGroupCreateService } from './chat-group-create-service';
import { ChatGroupDeleteService } from './chat-group-delete-service';
import { ChatGroupHttpService } from './../../../../services/http/chat-group-http.service';
import { ChatGroupDeleteComponent } from './../chat-group-delete/chat-group-delete.component';
import { ChatGroupEditComponent } from './../chat-group-edit/chat-group-edit.component';
import { ChatGroupCreateComponent } from './../chat-group-create/chat-group-create.component';
import { ChatGroup } from './../../../../models';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'chat-group-list',
  templateUrl: './chat-group-list.component.html',
  styleUrls: ['./chat-group-list.component.css']
})
export class ChatGroupListComponent implements OnInit {

  chatGroups: Array<ChatGroup> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  sortColumn = {column: 'created_at', sort: 'desc'};

  @ViewChild(ChatGroupCreateComponent) 
  chatGroupCreate: ChatGroupCreateComponent;
  @ViewChild(ChatGroupEditComponent) 
  chatGropupEdit: ChatGroupEditComponent;
  @ViewChild(ChatGroupDeleteComponent) 
  chatGropupDelete: ChatGroupEditComponent;
  
  chatGroupId:  number;
  chatGroupPhotoUrl: string;
  searchText: string;

  constructor(private chatGrouptHttp:ChatGroupHttpService,
              protected chatGroupCreateService: ChatGroupCreateService,
              protected chatGrouptEditService: ChatGroupEditService,
              protected chatGroupDeleteService: ChatGroupDeleteService) { 
    this.chatGroupCreateService.chatGroupListComponent = this;
    this.chatGrouptEditService.chatGroupListComponent = this;
    this.chatGroupDeleteService.chatGroupListComponent = this;        
  }

  ngOnInit() {
    //console.log('ngOnInit');
    this.getChatGroups();
  }
  getChatGroups(){
    this.chatGrouptHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe( response => {
        this.chatGroups = response.data,
        this.pagination.totalItems = response.meta.total,
        this.pagination.itemsPerPage = response.meta.per_page
      });
  }
  pageChanged(page){
    this.pagination.page = page;
    this.getChatGroups();
  }

  sort(sortColumn){
    this.getChatGroups();
  }

  search(search){
    this.searchText = search;
    this.getChatGroups();
  }

}
