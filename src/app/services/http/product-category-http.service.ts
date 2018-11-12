import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCategory } from '../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  private baseApi = 'http://whatsapp.test/api';

  constructor(private http: HttpClient) { }

  list(productId: number): Observable<ProductCategory> {
    return this.http
      .get<{data: ProductCategory}>
      (this.getBaseUrl(productId))
      .pipe(
        map(response => response.data)
      )
  }

  create(productId: number, categoriesId: number[]): Observable<ProductCategory>{
    //console.log(productId);
    return this.http
      .post<{data: ProductCategory}>
      (this.getBaseUrl(productId),{ categories:categoriesId })
      .pipe(
        map(response => response.data)
      )
  }

  private getBaseUrl(productId: number, categoryId: number = null): string {
    let baseUrl = `${this.baseApi}/products/${productId}/categories`;
    if (categoryId) {
      baseUrl += `/${categoryId}`;
    }
    return baseUrl;
  }

  
}
