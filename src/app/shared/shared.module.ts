import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { AppConfigModule } from '../layout/config/app.config.module';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';

@NgModule({
    imports: [
        MatSnackBarModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
                ButtonModule,
                InputTextModule,
                CheckboxModule,
                AppConfigModule,
                RippleModule,
                InputGroupModule,
                InputGroupAddonModule,
                DropdownModule,
                UserSelectorComponent
    ],
    declarations: [
        UserSelectorComponent
    ]
})
export class SharedModule
{
}
