import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatGroup, ChatGroupLinkInvitation } from '../../../../models';
import { ChatGroupLinkInvCreateComponent } from '../chat-group-link-inv-create/chat-group-link-inv-create.component';
import { ChatGroupLinkInvEditComponent } from '../chat-group-link-inv-edit/chat-group-link-inv-edit.component';
import { ChatGroupLinkInvDeleteComponent } from '../chat-group-link-inv-delete/chat-group-link-inv-delete.component';
import { ActivatedRoute } from '@angular/router';
import { ChatGroupLinkInvHttpService } from '../../../../services/http/chat-group-link-inv-http.service';
import { ChatGroupLinkInvCreateService } from './chat-group-link-inv-create.service';
import { ChatGroupLinkInvEditService }from './chat-group-link-inv-edit.service';
import { ChatGroupLinkInvDeleteService }from './chat-group-link-inv-delete.service';


@Component({
  selector: 'chat-group-link-inv-list',
  templateUrl: './chat-group-link-inv-list.component.html',
  styleUrls: ['./chat-group-link-inv-list.component.css']
})
export class ChatGroupLinkInvListComponent implements OnInit {

  groupId: number;
  linkInvIdToEdit: number;
  linkInvToDelete: number;
  chatGroup: ChatGroup
  linkInvitations: Array<ChatGroupLinkInvitation> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  }
  sortColumn = {column: 'created_at', sort: 'desc'};
  searchText: string;


  @ViewChild(ChatGroupLinkInvCreateComponent) linkInvCreate: ChatGroupLinkInvCreateComponent;
  @ViewChild(ChatGroupLinkInvEditComponent)  linkInvEdit: ChatGroupLinkInvEditComponent;
  @ViewChild(ChatGroupLinkInvDeleteComponent) linkInvDelete: ChatGroupLinkInvDeleteComponent;


  constructor(private route: ActivatedRoute,
              private linkInvHttp: ChatGroupLinkInvHttpService,
              protected linkInvCreateService: ChatGroupLinkInvCreateService,
              protected linkInvEditService: ChatGroupLinkInvEditService,
              protected linkInvDeleteService: ChatGroupLinkInvDeleteService) { 
    this.linkInvCreateService.linkInvListComponent = this;
    this.linkInvEditService.linkInvListComponent = this;
    this.linkInvDeleteService.linkInvListComponent = this;          
         
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.groupId = params.chat_group;
      this.getLinkInvitations();
    });

  }

  getLinkInvitations() {
    this.linkInvHttp.list(this.groupId, {
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe(response => {
        this.chatGroup = response.data.group;
        this.linkInvitations = response.data.link_invitations;
        this.pagination.totalItems = response.meta.total;
        this.pagination.itemsPerPage = response.meta.per_page;
      })
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getLinkInvitations();
  }

  sort(sortColumn){
    this.getLinkInvitations();
  }

  search(search){
    this.searchText = search;
    this.getLinkInvitations();
  }

}
