import { Injectable } from '@angular/core';
import { Product } from '../../models';

import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product>{

  private baseUrl = `${environment.api.url}/products`;

  constructor(private http:HttpClient) { }

  list(searchParams: SearchParams): Observable<{data: Array<Product>, meta: any}>{
    // makeObject -> class -> http-resource 
    const sParams = new SearchParamsBuilder(searchParams).makeObject()
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });

    return this.http
      .get<{data:Array<any>, meta: any}>(this.baseUrl, {
        params
    })

  }

  get(id: number): Observable<Product>{
    return this.http
      .get<{data: Product}>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data)) //pipeline
  }

  create(data: Product): Observable<Product>{
    return this.http
      .post<{ data: Product }>(this.baseUrl, data)
      .pipe(map(response => response.data)) //pipeline
  }

  update(id: number, data: Product): Observable<Product>{
    return this.http
      .put<{ data: Product }>(`${this.baseUrl}/${id}`, data)
      .pipe(map(response => response.data)) //pipeline
  }

  destroy(id: number): Observable<any>{
    const token = window.localStorage.getItem('token');
    return this.http
      .delete(`${this.baseUrl}/${id}`)
  }


}
