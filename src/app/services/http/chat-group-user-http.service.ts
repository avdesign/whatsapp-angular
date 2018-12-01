import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchParams, SearchParamsBuilder } from './http-resource';
import { Observable } from 'rxjs/internal/Observable';
import { ChatGroup, User } from './../../models';



@Injectable({
  providedIn: 'root'
})
export class ChatGroupUserHttpService {

  private baseApi = environment.api.url

  constructor(private http: HttpClient) { }

  list(chatGroupId: number, searchParams: SearchParams): Observable<{ data: { chat_Group: ChatGroup, users: User[] }, meta: any }> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });
    return this.http
      .get<{ data: { chat_Group: ChatGroup, users: User[] }, meta: any }>
      (this.getBaseUrl(chatGroupId), {params});
  }

  create(chatGroupId: number, userId: number[]): Observable<{ chat_Group: ChatGroup, users: User[] }> {
    return this.http
      .post<{ data: { chat_Group: ChatGroup, users: User[] } }>(this.getBaseUrl(chatGroupId), {users: userId})
      .pipe(
          map(response => response.data)
      );
  }

  destroy(chatGroupId: number, userId: number): Observable<any> {
    return this.http
        .delete(this.getBaseUrl(chatGroupId, userId));
  }

  private getBaseUrl(chatGroupId: number, userId: number = null): string {
    let baseUrl = `${this.baseApi}/chat_groups/${chatGroupId}/users`;
    if (userId) {
      baseUrl += `/${userId}`;
    }
    return baseUrl;
  }
}
