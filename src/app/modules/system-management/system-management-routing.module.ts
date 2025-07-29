import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
      
        { path: '', loadChildren: () => import('./controller/controller-list/controller-list.module').then(m => m.ControllerListModule) },
        // { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SystemManagementRoutingModule { }
