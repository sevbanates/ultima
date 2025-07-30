import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail.component';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { CustomerActions } from 'src/app/core/enums/actions-enum/actions.enum';
import { Controllers } from 'src/app/core/enums/actions-enum/controllers.enum';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CustomerDetailComponent, canActivate: [AuthGuard], data:{
            controllerName: Controllers.Customer,
            action: CustomerActions.View
        } }
    ])],
    exports: [RouterModule]
})
export class CustomerDetailRoutingModule { }
