import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile.component';

@NgModule({
    imports: [RouterModule.forChild([
      
        { path: '', component:MyProfileComponent},
        // { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
