import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { InputSwitchModule } from "primeng/inputswitch";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ControllerDetailsComponent } from "./controller-details.component";

@NgModule({
    declarations: [ControllerDetailsComponent],
    imports: [
        CommonModule,
        FormsModule,
        InputSwitchModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [ControllerDetailsComponent]
})
export class ControllerDetailsModule { }