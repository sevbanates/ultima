import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ControllerListComponent } from "./controller-list.component";
import { ControllerDetailsModule } from "../controller-details/controller-details.module";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { PaginatorModule } from "primeng/paginator";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";

const clientRoutes: Route[] = [
    {
        path: '',
        component: ControllerListComponent,
        data: {
            // controllerName: Controllers.WebSite,
            // action: ClientActions.List

        },
        // canActivate: [AuthGuard],
        // resolve: { customerResolver },

    }
]

@NgModule({
    declarations: [ControllerListComponent],
    imports: [
        RouterModule.forChild(clientRoutes),
        CommonModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        DialogModule,
        PaginatorModule,
        ControllerDetailsModule
    ]
})
export class ControllerListModule { }