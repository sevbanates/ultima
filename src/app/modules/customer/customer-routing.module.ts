import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { customerDetailResolver } from './services/customer.resolver';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { CustomerActions } from 'src/app/core/enums/actions-enum/actions.enum';
import { Controllers } from 'src/app/core/enums/actions-enum/controllers.enum';

@NgModule({
    imports: [RouterModule.forChild([
      
        { path: '', loadChildren: () => import('./customer-list/customer-list.module').then(m => m.CustomerListModule), canActivate: [AuthGuard],
            data:{
                controllerName: Controllers.Customer,
                action: CustomerActions.List
            }
         },
        { path: 'details/:id/:guidid', loadChildren: () => import('./customer-detail/customer-detail.module').then(m => m.CustomerDetailModule), resolve: {customerDetailResolver}, canActivate: [AuthGuard], data:{
            controllerName: Controllers.Customer,
            action: CustomerActions.View
        } },
        { path: 'create', loadChildren: () => import('./customer-detail/customer-detail.module').then(m => m.CustomerDetailModule), canActivate: [AuthGuard], data:{
            controllerName: Controllers.Customer,
            action: CustomerActions.Save
        } },
        // { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
