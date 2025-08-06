import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userDetailResolver } from './services/customer.resolver';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';

@NgModule({
    imports: [RouterModule.forChild([
      
        { path: '', loadChildren: () => import('./components/user-list/user-list.module').then(m => m.UserListModule), canActivate: [AuthGuard] },

        { path: 'details/:id/:guidid', loadChildren: () => import('./components/user-detail/user-detail.module').then(m => m.UserDetailModule), canActivate: [AuthGuard], resolve: {userDetailResolver} },
        { path: 'create', loadChildren: () => import('./components/user-detail/user-detail.module').then(m => m.UserDetailModule), canActivate: [AuthGuard] },
        // { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UserRoutingModule { }
