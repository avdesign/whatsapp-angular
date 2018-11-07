import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
;

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router/';

import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './components/pages/categories/category-list/category-list.component';
import { AlertErrorComponent } from './components/bootstrap/alert-error/alert-error.component';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { CategoryCreateComponent } from './components/pages/categories/category-create/category-create.component';
import { CategoryEditComponent } from './components/pages/categories/category-edit/category-edit.component';

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
    path: 'categories/list', component: CategoryListComponent
 }

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryListComponent,
    AlertErrorComponent,
    ModalComponent,
    CategoryCreateComponent,
    CategoryEditComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes) //{enableTracing:true}
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
