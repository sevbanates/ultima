import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in.component';

@NgModule({
imports: [RouterModule.forChild([
    { path: '',component: SignInComponent  }, // Sadece yönlendirme
    // { path: 'login', component: SignInComponent } // Sadece bileşen
])],
    exports: [RouterModule]
})
export class SignInRoutingModule { }
