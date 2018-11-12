import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponseBase } from '@angular/common/http';
import { AuthGuard } from '../guards/auth.guard';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpResponse } from 'selenium-webdriver/http';
import { AuthService } from './auth/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefereshTokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          //console.log(event);
          this.setNewTokenIfResponseValid(event);
        }, (eventError: HttpEvent<any>) => {
          this.setNewTokenIfResponseValid(eventError);
          this.redirectToLoginIfUnauthenticated(eventError);

        })
      )
  }

  private redirectToLoginIfUnauthenticated(eventError: HttpEvent<any>){
    if( eventError instanceof HttpResponseBase && eventError.status == 401) {
      this.authService.setToken(null);
      this.router.navigate(['login']);
    }
  }

  

  private setNewTokenIfResponseValid(event: HttpEvent<any>){
    if(event instanceof HttpResponseBase) {
      const authorizationHeader = event.headers.get('authorization');
      //console.log(authorizationHeader);
      if(authorizationHeader){
        const token = authorizationHeader.split(' ')[1];
        this.authService.setToken(token);
      }
    }
  }


  

}