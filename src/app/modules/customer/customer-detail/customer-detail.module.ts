import { Route, RouterModule } from "@angular/router";
import { CustomerDetailComponent } from "./customer-detail.component";
import { customerDetailResolver } from "../services/customer.resolver";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ProgressBarModule } from "primeng/progressbar";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from "primeng/fileupload";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ProfileCreateRoutingModule } from "src/app/demo/components/profile/create/profilecreate-routing.module";
import { CustomerDetailRoutingModule } from "./customer-detail-routing.module";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";



@NgModule({
    declarations: [CustomerDetailComponent],
    imports: [
        CustomerDetailRoutingModule,
        CommonModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        ProgressBarModule,
        FormsModule,
        ProfileCreateRoutingModule,
        DropdownModule,
        FileUploadModule,
        InputTextareaModule,
        InputGroupModule,
        InputGroupAddonModule,
        ReactiveFormsModule,
        InputNumberModule,
        InputMaskModule 
    ]
})
export class CustomerDetailModule { }