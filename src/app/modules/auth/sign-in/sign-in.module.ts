import { Route, RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { AppConfigModule } from "src/app/layout/config/app.config.module";
import { SignInRoutingModule } from "./sign-in-router.module";


@NgModule({
    
    imports: [
     
    SignInRoutingModule,
        CommonModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        AppConfigModule,
        RippleModule,
        InputGroupModule,
        InputGroupAddonModule,
        ReactiveFormsModule
    ],
    declarations: [SignInComponent]
})
export class AuthSignInModule
{
}