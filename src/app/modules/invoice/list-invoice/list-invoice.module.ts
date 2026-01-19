import { Route, RouterModule } from "@angular/router";
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
import { ListInvoiceRoutingModule } from "./list-invoice-router.module";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ContextMenuModule } from "primeng/contextmenu";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { PanelMenuModule } from "primeng/panelmenu";
import { StepsModule } from "primeng/steps";
import { TabMenuModule } from "primeng/tabmenu";
import { TieredMenuModule } from "primeng/tieredmenu";
import { MessageService } from "primeng/api";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";

import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { ListInvoiceComponent } from "./list-invoice.component";


@NgModule({
    
    imports: [
        BreadcrumbModule,
        MenubarModule,
        TabMenuModule,
        StepsModule,
        TieredMenuModule,
        MenuModule,
        ContextMenuModule,
        MegaMenuModule,
        PanelMenuModule,
    ListInvoiceRoutingModule,
        CommonModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        AppConfigModule,
        RippleModule,
        InputGroupModule,
        InputGroupAddonModule,
        ReactiveFormsModule,
        CardModule,
    DividerModule,
    DropdownModule ,
    CalendarModule,
    InputTextareaModule,
    TableModule,
    DialogModule,
    ToastModule
    ],
    declarations: [ListInvoiceComponent],
    providers:[MessageService]
})
export class ListInvoiceModule
{
}