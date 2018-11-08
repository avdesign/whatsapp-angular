import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { CategoryInterface } from '../../interfaces/categoryInterface';

// design pattern - Singleton

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  private baseUrl = 'http://whatsapp.test/api/categories';

  constructor(private http:HttpClient) { }

  list(): Observable<{data: Array<CategoryInterface>}>{
    const token = window.localStorage.getItem('token');
    return this.http
      .get<{data:Array<any>}>(this.baseUrl, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    })

  }

  get(id: number): Observable<CategoryInterface>{
    const token = window.localStorage.getItem('token');
    return this.http
      .get<{data: CategoryInterface}>
      (`${this.baseUrl}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    })
    .pipe(map(response => response.data)) //pipeline
  }

  create(data: CategoryInterface): Observable<CategoryInterface>{
    const token = window.localStorage.getItem('token');
    return this.http
      .post<{ data: CategoryInterface }>(this.baseUrl, data, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      .pipe(map(response => response.data)) //pipeline
  }

  update(id: number, data: CategoryInterface){
    const token = window.localStorage.getItem('token');
    return this.http
      .put<{ data: CategoryInterface }>(`${this.baseUrl}/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      .pipe(map(response => response.data)) //pipeline
  }

  destroy(id: number): Observable<any>{
    const token = window.localStorage.getItem('token');
    return this.http
      .delete(`${this.baseUrl}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    })
  }


}
