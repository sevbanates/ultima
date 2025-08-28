import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { PaginatorModule } from "primeng/paginator";
import { ProgressBarModule } from "primeng/progressbar";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { UserListComponent } from "./user-list.component";
import { userResolver } from "../../services/customer.resolver";

const clientRoutes: Route[] = [
    {
        path: '',
        component: UserListComponent,
        // data: {
        //     controllerName: 'users',
        //     // action: ClientActions.List

        // },
        // canActivate: [AuthGuard],
        // resolve: { userResolver },

    }
]

@NgModule({
    declarations: [UserListComponent],
    imports: [
        RouterModule.forChild(clientRoutes),
        CommonModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        ProgressBarModule,
        DialogModule,
        PaginatorModule,
        TagModule
    ]
})
export class UserListModule { }