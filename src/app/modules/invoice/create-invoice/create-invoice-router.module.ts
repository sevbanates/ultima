import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice.component';
import { RecipientComponent } from './recipient/recipient.component';
import { InvoiceInformationComponent } from './invoice-information/invoice-information.component';
import { InvoiceProductComponent } from './invoice-product/invoice-product.component';

@NgModule({
imports: [RouterModule.forChild([
    { path: '',
      component: CreateInvoiceComponent, 
      children:[
        { path: 'recipient',component: RecipientComponent },
        { path: 'invoice-information',component: InvoiceInformationComponent },
        { path: 'invoice-product',component: InvoiceProductComponent }
      ]
    }, 
    // { path: 'login', component: SignInComponent } // Sadece bileşen
])],
    exports: [RouterModule]
})
export class CreateInvoiceRoutingModule { }
