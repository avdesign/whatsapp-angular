import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SearchParams, SearchParamsBuilder } from './http-resource';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ChatGroup, ChatInvitationUser, ChatInvitationUserStatus } from '../../models';


@Injectable({
  providedIn: 'root'
})
export class ChatInvUserHttpService {

  private baseApi = environment.api.url;

  constructor(private http: HttpClient) {    
  }

  list(chatGroupId: number, searchParams: SearchParams): Observable<{ data: {group: ChatGroup, invitations: ChatInvitationUser[]}, meta: any}>{
    const sParams = new SearchParamsBuilder(searchParams).makeObject()
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });
    return this.http
        .get<{ data: {group: ChatGroup, invitations: ChatInvitationUser[]}, meta: any}>(this.getBaseUrl(chatGroupId), {params});
  }

  get(chatGroupId: number, invitationId: number): Observable<ChatInvitationUser> {
    return this.http
        .get<{ data: ChatInvitationUser }>(this.getBaseUrl(chatGroupId, invitationId))
        .pipe(
            map(response => response.data)
        );        
  }

  update(chatGroupId: number, invitationId: number, status: ChatInvitationUserStatus): Observable<ChatInvitationUser>{
    return this.http
        .patch<{ data: ChatInvitationUser }>(this.getBaseUrl(chatGroupId, invitationId), {status})
        .pipe(
          map(response => response.data)
        );  
  }
  
  private getBaseUrl(chatGroupId: number, invitationId: number = null): string {
    let baseUrl = `${this.baseApi}/chat_groups/${chatGroupId}/invitations`;
    if (invitationId) {
      baseUrl += `/${invitationId}`;
    }
    return baseUrl;
  }





}
