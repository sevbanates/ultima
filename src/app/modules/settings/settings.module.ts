import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { RecievedRequestsComponent } from './components/recieved-requests/recieved-requests.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { Controllers } from 'src/app/core/enums/actions-enum/controllers.enum';
import { AccounterRequestActions } from 'src/app/core/enums/actions-enum/actions.enum';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SettingsListComponent
  },
  {
    path: 'requests',
    component: RecievedRequestsComponent,

  },
  {
    path: 'accounter/create-requests',
    component: CreateRequestComponent,
    canActivate: [AuthGuard],
    data: {
      controllerName: Controllers.AccounterRequest,
      action: AccounterRequestActions.List
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SettingsListComponent,
    RecievedRequestsComponent,
    CreateRequestComponent
  ]
})
export class SettingsModule { }
