import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
      
        { path: 'create', loadChildren: () => import('./create-invoice/create-invoice.module').then(m => m.CreateInvoiceModule) },
        { path: 'list', loadChildren: () => import('./list-invoice/list-invoice.module').then(m => m.ListInvoiceModule) },
        // { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class InvoiceRoutingModule { }
