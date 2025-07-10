import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProfileRoutingModule } from "./profile-routing.module";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { FileUploadModule } from "primeng/fileupload";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RippleModule } from "primeng/ripple";
import { MyProfileComponent } from "./my-profile.component";

@NgModule({
    declarations: [MyProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
                
                FormsModule,
                ButtonModule,
                RippleModule,
                InputTextModule,
                DropdownModule,
                FileUploadModule,
                InputTextareaModule,
                InputGroupModule,
                InputGroupAddonModule
    ]
})
export class ProfileModule { }