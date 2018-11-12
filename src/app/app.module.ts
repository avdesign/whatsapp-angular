import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
;

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router/';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertErrorComponent } from './components/bootstrap/alert-error/alert-error.component';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { AuthService } from './services/auth/auth.service';


// Pages
import { LoginComponent } from './components/pages/login/login.component';

import { UserCreateComponent } from './components/pages/users/user-create/user-create.component';
import { UserListComponent } from './components/pages/users/user-list/user-list.component';
import { UserEditComponent } from './components/pages/users/user-edit/user-edit.component';
import { UserDeleteComponent } from './components/pages/users/user-delete/user-delete.component';

import { CategoryListComponent } from './components/pages/categories/category-list/category-list.component';
import { CategoryCreateComponent } from './components/pages/categories/category-create/category-create.component';
import { CategoryEditComponent } from './components/pages/categories/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './components/pages/categories/category-delete/category-delete.component';

import { ProductListComponent } from './components/pages/products/product-list/product-list.component';
import { ProductCreateComponent } from './components/pages/products/product-create/product-create.component';
import { ProductEditComponent } from './components/pages/products/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/pages/products/product-delete/product-delete.component';
import { NumberFormatBrPipe } from './pipes/number-format-br.pipe';

import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { ProductCategoryNewComponent } from './components/pages/product-category/product-category-new/product-category-new.component';
import { NavbarComponent } from './components/bootstrap/navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';
import { RefereshTokenInterceptorService } from './services/referesh-token-interceptor.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'users/list', component: UserListComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'products/:product/categories/list', component: ProductCategoryListComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'products/list', component: ProductListComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'categories/list', component: CategoryListComponent,
      canActivate: [AuthGuard]
  }

]


function jwtFactory(authService: AuthService) {
  return {
      whitelistedDomains: [
        new RegExp('whatsapp.test/*')
      ],
      tokenGetter: () => {
        return authService.getToken();
      }
  }
}



@NgModule({
  declarations: [
    AppComponent,
    AlertErrorComponent,
    ModalComponent,
    NumberFormatBrPipe,
    LoginComponent,
    UserCreateComponent,
    UserListComponent,
    UserEditComponent,
    UserDeleteComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryDeleteComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    ProductCategoryListComponent,
    ProductCategoryNewComponent,
    NavbarComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes), //{enableTracing:true}
    NgxPaginationModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthService]
      }
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefereshTokenInterceptorService,
      multi: true  
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
