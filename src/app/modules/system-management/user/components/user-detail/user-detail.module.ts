import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DialogService } from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { PaginatorModule } from "primeng/paginator";
import { ProgressBarModule } from "primeng/progressbar";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { UserDetailComponent } from "./user-detail.component";
import { UserDetailRoutingModule } from "./user-detail-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";

const clientRoutes: Route[] = [
    {
        path: '',
        component: UserDetailComponent,
        // data: {
        //     controllerName: 'users',
        //     // action: ClientActions.List

        // },
        // canActivate: [AuthGuard],
        // resolve: { userResolver },

    }
]

@NgModule({
    declarations: [UserDetailComponent],
    imports: [
        // RouterModule.forChild(clientRoutes),
        UserDetailRoutingModule,
        CommonModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        ProgressBarModule,
        DialogModule,
        DynamicDialogModule,
        PaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxModule
    ],
    providers: [DialogService]
})
export class UserDetailModule { }