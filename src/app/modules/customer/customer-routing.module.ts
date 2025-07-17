import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { customerDetailResolver } from './services/customer.resolver';

@NgModule({
    imports: [RouterModule.forChild([
      
        { path: '', loadChildren: () => import('./customer-list/customer-list.module').then(m => m.CustomerListModule) },
        { path: 'details/:id/:guidid', loadChildren: () => import('./customer-detail/customer-detail.module').then(m => m.CustomerDetailModule), resolve: {customerDetailResolver} },
        { path: 'create', loadChildren: () => import('./customer-detail/customer-detail.module').then(m => m.CustomerDetailModule) },
        // { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
