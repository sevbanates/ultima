import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { roleResolver } from './services/controller.resolver';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { Controllers } from 'src/app/core/enums/actions-enum/controllers.enum';
import { SysControllerActionRoleActions } from 'src/app/core/enums/actions-enum/actions.enum';

@NgModule({
    imports: [RouterModule.forChild([
      
        { path: '', loadChildren: () => import('./controller-list/controller-list.module').then(m => m.ControllerListModule), canActivate: [AuthGuard], resolve: {roleResolver}, data: {
            controllerName: Controllers.SysControllerActionRole,
            action: SysControllerActionRoleActions.List
        } },

        // { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ControllerRoutingModule { }
