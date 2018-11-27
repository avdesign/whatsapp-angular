import { AuthService } from './../auth/auth.service';
import { User } from './../../models';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

interface Profile {
  name?: string;
  email?: string;
  password?: string;
  photo?: File | false | null,
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileHttpService {

  private baseUrl = `${environment.api.url}/profile`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Recebe um novo token com a atualização do usuário
   * 
   * @param data 
   */
  update(data: Profile): Observable<{user: User, token: string}>{
    const formData = this.formDataToSend(data);
    return this.http
      .post<{user: User, token: string}>(this.baseUrl, formData)
      .pipe(
        tap(response => {
          this.authService.setToken(response.token);
        })
      );
  }


  private formDataToSend(data): FormData {
    const dataKeys = Object.keys(data);
    this.deletePhotoKey(dataKeys);
    const formData = new FormData();
    for (const key of dataKeys) {
      if (data[key] !== '' && data[key] !== null) {
        formData.append(key, data[key])
      }
    }
    this.dataInstanceOfFile(data, formData);
    this.dataPhotoIsNull(data, formData);
    formData.append('_method', 'PATCH');
    return formData;
  }

  private dataInstanceOfFile(data, formData) {
    if (data.photo instanceof File) {
      formData.append('photo', data.photo);
    }
  }

  private dataPhotoIsNull(data, formData) {
    if (data.photo === null) {
      formData.append('remove_photo', '1');
    }
  }

  private deletePhotoKey(array){
    array.splice(array.indexOf('photo'), 1);
  }



}
