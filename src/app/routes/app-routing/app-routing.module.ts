import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../../components/pages/login/login.component';
import { UserListComponent } from '../../components/pages/users/user-list/user-list.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ProductCategoryListComponent } from '../../components/pages/product-category/product-category-list/product-category-list.component';
import { ProductListComponent } from '../../components/pages/products/product-list/product-list.component';
import { ProductInputListComponent } from '../../components/pages/products-inputs/product-input-list/product-input-list.component';
import { CategoryListComponent } from '../../components/pages/categories/category-list/category-list.component';
import { ProductPhotoManagerComponent } from '../../components/pages/products-photos/product-photo-manager/product-photo-manager.component';



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
    path: 'products/:product/photos/manager', component: ProductPhotoManagerComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'categories/list', component: CategoryListComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'inputs/list', component: ProductInputListComponent,
      canActivate: [AuthGuard]
  },


]

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes), //{enableTracing:true}

   ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers: [ AuthGuard ],
})


export class AppRoutingModule {}
