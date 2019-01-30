import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UserSearchComponent } from './components/pages/users/user-search/user-search.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';

import { CategoryListComponent } from './components/pages/categories/category-list/category-list.component';
import { CategoryCreateComponent } from './components/pages/categories/category-create/category-create.component';
import { CategoryEditComponent } from './components/pages/categories/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './components/pages/categories/category-delete/category-delete.component';
import { CategorySearchComponent } from './components/pages/categories/category-search/category-search.component';
import { CategoryFormComponent } from './components/pages/categories/category-form/category-form.component';


import { ProductListComponent } from './components/pages/products/product-list/product-list.component';
import { ProductCreateComponent } from './components/pages/products/product-create/product-create.component';
import { ProductEditComponent } from './components/pages/products/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/pages/products/product-delete/product-delete.component';
import { ProductSearchComponent } from './components/pages/products/product-search/product-search.component';
import { ProductFormComponent } from './components/pages/products/product-form/product-form.component';

import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { ProductCategoryNewComponent } from './components/pages/product-category/product-category-new/product-category-new.component';

import { ProductInputCreateComponent } from './components/pages/products-inputs/product-input-create/product-input-create.component';
import { ProductInputListComponent } from './components/pages/products-inputs/product-input-list/product-input-list.component';
import { ProductInputFormComponent } from './components/pages/products-inputs/product-input-form/product-input-form.component';
import { ProductInputSearchComponent } from './components/pages/products-inputs/product-input-search/product-input-search.component';

import { ProductPhotoManagerComponent } from './components/pages/products-photos/product-photo-manager/product-photo-manager.component';
import { ProductPhotoUploadComponent } from './components/pages/products-photos/product-photo-upload/product-photo-upload.component';
import { ProductPhotoEditComponent } from './components/pages/products-photos/product-photo-edit/product-photo-edit.component';
import { ProductPhotoDeleteComponent } from './components/pages/products-photos/product-photo-delete/product-photo-delete.component';

import { RefereshTokenInterceptorService } from './services/referesh-token-interceptor.service';
import { AppRoutingModule } from './routes/app-routing/app-routing.module';

import { NavbarComponent } from './components/bootstrap/navbar/navbar.component';
import { NumberFormatBrPipe } from './pipes/number-format-br.pipe';
import { SortColumnComponent } from './components/common/sort-column/sort-column.component';
import { UserFormComponent } from './components/pages/users/user-form/user-form.component';
import { FieldErrorComponent } from './components/bootstrap/field-error/field-error.component';
import { IsInvalidDirective, IsInvalidControlDirective } from './directives/is-invalid.directive';
import { ListErrorComponent } from './components/bootstrap/list-error/list-error.component';
import { CardErrorComponent } from './components/bootstrap/card-error/card-error.component';
import { Select2Module } from 'ng2-select2';
import { PhoneNumberAuthModalComponent } from './components/common/phone-number-auth-modal/phone-number-auth-modal.component';
import { ChatGroupCreateComponent } from './components/pages/chat-groups/chat-group-create/chat-group-create.component';
import { ChatGroupEditComponent } from './components/pages/chat-groups/chat-group-edit/chat-group-edit.component';
import { ChatGroupFormComponent } from './components/pages/chat-groups/chat-group-form/chat-group-form.component';
import { ChatGroupDeleteComponent } from './components/pages/chat-groups/chat-group-delete/chat-group-delete.component';
import { ChatGroupListComponent } from './components/pages/chat-groups/chat-group-list/chat-group-list.component';
import { ChatGroupUserListComponent } from './components/pages/chat-group-users/chat-group-user-list/chat-group-user-list.component';
import { ChatGroupUserCreateComponent } from './components/pages/chat-group-users/chat-group-user-create/chat-group-user-create.component';
import { ChatGroupUserDeleteComponent } from './components/pages/chat-group-users/chat-group-user-delete/chat-group-user-delete.component';
import { ChatGroupLinkInvDeleteComponent } from './components/pages/chat-group-link-inv/chat-group-link-inv-delete/chat-group-link-inv-delete.component';
import { ChatGroupLinkInvCreateComponent } from './components/pages/chat-group-link-inv/chat-group-link-inv-create/chat-group-link-inv-create.component';
import { ChatGroupLinkInvFormComponent } from './components/pages/chat-group-link-inv/chat-group-link-inv-form/chat-group-link-inv-form.component';
import { ChatGroupLinkInvEditComponent } from './components/pages/chat-group-link-inv/chat-group-link-inv-edit/chat-group-link-inv-edit.component';
import { ChatGroupLinkInvListComponent } from './components/pages/chat-group-link-inv/chat-group-link-inv-list/chat-group-link-inv-list.component';
import { ChatInvUserListComponent } from './components/pages/chat-invitations-users/chat-inv-user-list/chat-inv-user-list.component';
import { ChatInvUserStatusComponent } from './components/pages/chat-invitations-users/chat-inv-user-status/chat-inv-user-status.component';

function jwtFactory(authService: AuthService) {
  return {
      whitelistedDomains: [
        new RegExp('192.168.0.106:8000/*'),
        new RegExp('192.168.1.7/*')
        
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
    UserSearchComponent,
    UserProfileComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryDeleteComponent,
    CategorySearchComponent,
    CategoryFormComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    ProductSearchComponent,
    ProductFormComponent,
    ProductCategoryListComponent,
    ProductCategoryNewComponent,
    ProductInputCreateComponent,
    ProductInputListComponent,
    ProductInputFormComponent,
    ProductInputSearchComponent,
    ProductPhotoManagerComponent,
    ProductPhotoUploadComponent,
    ProductPhotoEditComponent,
    ProductPhotoDeleteComponent,
    NavbarComponent,
    SortColumnComponent,
    UserFormComponent,
    FieldErrorComponent,
    IsInvalidDirective,
    IsInvalidControlDirective,
    ListErrorComponent,
    CardErrorComponent,
    PhoneNumberAuthModalComponent,
    ChatGroupCreateComponent,
    ChatGroupEditComponent,
    ChatGroupFormComponent,
    ChatGroupDeleteComponent,
    ChatGroupListComponent,
    ChatGroupUserListComponent,
    ChatGroupUserCreateComponent,
    ChatGroupUserDeleteComponent,
    ChatGroupLinkInvDeleteComponent,
    ChatGroupLinkInvCreateComponent,
    ChatGroupLinkInvFormComponent,
    ChatGroupLinkInvEditComponent,
    ChatGroupLinkInvListComponent,
    ChatInvUserListComponent,
    ChatInvUserStatusComponent,   

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    Select2Module,
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
