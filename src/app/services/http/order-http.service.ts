import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchParams, SearchParamsBuilder } from './http-resource';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Order } from '../../models';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {

  private baseUrl = `${environment.api.url}/orders`;

  constructor(private http:HttpClient) { }

  list(searchParams: SearchParams): Observable<{ data: Array<Order>, meta: any }> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });
    return this.http
      .get<{ data: Array<Order>, meta: any }>
      (this.baseUrl, {params});
  }

  get(id: number): Observable<Order>{
    return this.http
      .get<{data: Order}>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }
/*
  update(id: number, data: Order): Observable<Order>{
    return this.http
      .put<{ data: Order }>(`${this.baseUrl}/${id}`, data)
      .pipe(
        map(response => response.data)
      );
  }
*/


}
