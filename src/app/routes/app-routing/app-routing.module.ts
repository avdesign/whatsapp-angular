import { NgModule } from '@angular/core';
import { LoginComponent } from '../../components/pages/login/login.component';
import { UserListComponent } from '../../components/pages/users/user-list/user-list.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ProductCategoryListComponent } from '../../components/pages/product-category/product-category-list/product-category-list.component';
import { ProductListComponent } from '../../components/pages/products/product-list/product-list.component';
import { CategoryListComponent } from '../../components/pages/categories/category-list/category-list.component';
import { Routes, RouterModule } from '@angular/router';


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
