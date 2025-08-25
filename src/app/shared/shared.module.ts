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
import { FindPipe } from './pipes/find.pipe';

@NgModule({
    imports: [
        MatSnackBarModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        RippleModule,
        InputGroupModule,
        InputGroupAddonModule,
        DropdownModule,
        AppConfigModule
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
        UserSelectorComponent,
        FindPipe
    ],
    declarations: [
        UserSelectorComponent,
        FindPipe
    ]
})
export class SharedModule
{
}
