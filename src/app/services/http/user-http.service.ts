import { Injectable } from '@angular/core';
import { SearchParams, SearchParamsBuilder } from './http-resource';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../models';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  private baseUrl = `${environment.api.url}/users`;

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams): Observable<{data: Array<User>, meta: any}>{
    // makeObject -> class -> http-resource 
    const sParams = new SearchParamsBuilder(searchParams).makeObject()
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });    
    return this.http.get<{data:Array<any>, meta: any}>(this.baseUrl, {params});
  }

  get(id: number): Observable<User>{
    return this.http
      .get<{data: User}>
      (`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));//pipeline
  }

  create(data: User): Observable<User>{
    return this.http
      .post<{ data: User }>(this.baseUrl, data)
      .pipe(map(response => response.data)); //pipeline
  }

  update(id: number, data: User): Observable<User>{
    return this.http
      .put<{ data: User }>(`${this.baseUrl}/${id}`, data)
      .pipe(map(response => response.data)); //pipeline
  }

  destroy(id: number): Observable<any>{
    const token = window.localStorage.getItem('token');
    return this.http
      .delete(`${this.baseUrl}/${id}`);
  }


}
