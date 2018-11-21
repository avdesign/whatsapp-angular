import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product, ProductPhoto } from '../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoHttpService {

  private baseApi =  environment.api.url;

  constructor(private http: HttpClient) { }

  list(pruductId:number): Observable<{product: Product, photos: ProductPhoto[]}>{
    return this.http
        .get<{data: any}>(this.getBaseUrl(pruductId))
        .pipe(
          map(response => response.data)
        )
  }

  create(productId: number, files: FileList): Observable<{ product: Product, photos: ProductPhoto[] }> {
    //FormData Javascript puro
    const formData = new FormData();
    const filesArray = Array.from(files);
    filesArray.forEach((file) => {
        formData.append('photos[]', file);
    });
    return this.http.post<any>(this.getBaseUrl(productId), formData);
  }


  update(productId: number, photoId: number, file: File): Observable<ProductPhoto> {
    //FormData Javascript puro
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('_method', 'PUT');
    return this.http
      .post<any>(this.getBaseUrl(productId, photoId), formData)
      .pipe(
        map(response => response.data)
      );
  }

  private getBaseUrl(productId: number, photoId: number = null): string{
    let baseUrl = `${this.baseApi}/products/${productId}/photos`;
    if (photoId) {
      baseUrl += `/${photoId}`;
    }
    return baseUrl;
  }
}
