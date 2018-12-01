import { UserProfile } from './../../models';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../../components/pages/login/login.component';
import { UserListComponent } from '../../components/pages/users/user-list/user-list.component';
import { UserProfileComponent } from '../../components/pages/user-profile/user-profile.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ProductCategoryListComponent } from '../../components/pages/product-category/product-category-list/product-category-list.component';
import { ProductListComponent } from '../../components/pages/products/product-list/product-list.component';
import { ProductInputListComponent } from '../../components/pages/products-inputs/product-input-list/product-input-list.component';
import { CategoryListComponent } from '../../components/pages/categories/category-list/category-list.component';
import { ProductPhotoManagerComponent } from '../../components/pages/products-photos/product-photo-manager/product-photo-manager.component';
import { ChatGroupListComponent } from './../../components/pages/chat-groups/chat-group-list/chat-group-list.component';
import { ChatGroupUserListComponent } from '../../components/pages/chat-group-users/chat-group-user-list/chat-group-user-list.component';

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
    path: 'profile', component: UserProfileComponent,
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
  {
    path: 'groups/list', component: ChatGroupListComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'chat-groups/:chat_group/users/list', component: ChatGroupUserListComponent,
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
