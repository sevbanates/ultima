import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userDetailResolver } from './services/customer.resolver';

@NgModule({
    imports: [RouterModule.forChild([
      
        { path: '', loadChildren: () => import('./components/user-list/user-list.module').then(m => m.UserListModule) },

        { path: 'details/:id/:guidid', loadChildren: () => import('./components/user-detail/user-detail.module').then(m => m.UserDetailModule), resolve: {userDetailResolver} },
        { path: 'create', loadChildren: () => import('./components/user-detail/user-detail.module').then(m => m.UserDetailModule) },
        // { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UserRoutingModule { }
