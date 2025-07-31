import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerActions } from 'src/app/core/enums/actions-enum/actions.enum';
import { Controllers } from 'src/app/core/enums/actions-enum/controllers.enum';
import { SettingsListComponent } from './components/settings-list/settings-list.component';

@NgModule({
    imports: [RouterModule.forChild([
      
        { path: '', component: SettingsListComponent, 
            // canActivate: [AuthGuard], 
            // data:{
            //     controllerName: Controllers.Settings,
            //     action: SettingsActions.List
            // }
         },
       
        // { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
