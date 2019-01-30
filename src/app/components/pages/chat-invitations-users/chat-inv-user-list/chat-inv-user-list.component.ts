import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGroup, ChatInvitationUser, ChatInvitationUserStatus } from '../../../../models';
import { ChatInvUserHttpService } from '../../../../services/http/chat-inv-user-http.service';


@Component({
  selector: 'app-chat-inv-user-list',
  templateUrl: './chat-inv-user-list.component.html',
  styleUrls: ['./chat-inv-user-list.component.css']
})
export class ChatInvUserListComponent implements OnInit {

  groupId: number;
  chatGroup: ChatGroup
  invitations: ChatInvitationUser[] = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  }
  sortColumn = {column: 'created_at', sort: 'desc'};
  STATUS = ChatInvitationUserStatus;

  searchText: string;

  constructor(private route: ActivatedRoute,
              private linkInvHttp: ChatInvUserHttpService) { 
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.groupId = params.chat_group;
      this.getInvitations();
    });

  }

  getInvitations() {
    this.linkInvHttp.list(this.groupId, {
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe(response => {
        this.chatGroup = response.data.group;
        this.invitations = response.data.invitations;
        this.pagination.totalItems = response.meta.total;
        this.pagination.itemsPerPage = response.meta.per_page;
      })
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getInvitations();
  }

  sort(sortColumn){
    this.getInvitations();
  }

  search(search){
    this.searchText = search;
    this.getInvitations();
  }

  onStatusChanged($event: ChatInvitationUserStatus, inv: ChatInvitationUser) {
    inv.status = $event
  }

}
