import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CustomerDetailComponent }
    ])],
    exports: [RouterModule]
})
export class CustomerDetailRoutingModule { }
