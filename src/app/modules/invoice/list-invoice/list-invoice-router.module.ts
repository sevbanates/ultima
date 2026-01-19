import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListInvoiceComponent } from './list-invoice.component';


@NgModule({
imports: [RouterModule.forChild([
    { path: '',
      component: ListInvoiceComponent, 
      children:[
        // { path: 'recipient',component: RecipientComponent },
        // { path: 'invoice-information',component: InvoiceInformationComponent },
        // { path: 'invoice-product',component: InvoiceProductComponent }
      ]
    }, 
    // { path: 'login', component: SignInComponent } // Sadece bileşen
])],
    exports: [RouterModule]
})
export class ListInvoiceRoutingModule { }
