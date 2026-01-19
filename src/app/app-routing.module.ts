import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: ''
    },
    {
        path: '', component: AppLayoutComponent,
        canMatch: [AuthGuard],
        children: [
            { path: '', loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'profile', data: { breadcrumb: 'Profil' }, loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'invoice', data: { breadcrumb: 'Fatura' }, loadChildren: () => import('./modules/invoice/invoice.module').then(m => m.InvoiceModule) },
            { path: 'customers', data: { breadcrumb: 'Cariler' }, loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) },
            { path: 'controllers', data: { breadcrumb: 'Controllers' }, loadChildren: () => import('./modules/system-management/controller/controller.module').then(m => m.ControllerModule) },
            { path: 'users', data: { breadcrumb: 'Users' }, loadChildren: () => import('./modules/system-management/user/user.module').then(m => m.UserModule) },
            { path: 'settings', data: { breadcrumb: 'Ayarlar' }, loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
            { path: 'tickets', data: { breadcrumb: 'Teknik Destek' }, loadChildren: () => import('./modules/support/ticket.module').then(m => m.TicketModule) }
        ]
    },
    { path: 'auth', canMatch: [NoAuthGuard], data: { breadcrumb: 'Auth' }, loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule2) },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
