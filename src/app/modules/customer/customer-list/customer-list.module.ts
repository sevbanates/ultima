import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomerListComponent } from "./customer-list.component";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ProgressBarModule } from "primeng/progressbar";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { Controllers } from "src/app/core/enums/actions-enum/controllers.enum";
import { ClientActions } from "src/app/core/enums/actions-enum/actions.enum";
import { Route, RouterModule } from "@angular/router";
import { customerResolver } from "../services/customer.resolver";
import { CustomerDetailComponent } from "../customer-detail/customer-detail.component";
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';


const clientRoutes: Route[] = [
    {
        path: '',
        component: CustomerListComponent,
        data: {
            // controllerName: Controllers.WebSite,
            // action: ClientActions.List

        },
        // canActivate: [AuthGuard],
        resolve: { customerResolver },

    }
]

@NgModule({
    declarations: [CustomerListComponent],
    imports: [
        RouterModule.forChild(clientRoutes),
        CommonModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        ProgressBarModule,
        DialogModule,
        PaginatorModule
    ]
})
export class CustomerListModule { }