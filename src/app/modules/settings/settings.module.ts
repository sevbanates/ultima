import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { RecievedRequestsComponent } from './components/recieved-requests/recieved-requests.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsListComponent
  },
  {
    path: 'recieved-requests',
    component: RecievedRequestsComponent
  },
  {
    path: 'create-requests',
    component: CreateRequestComponent
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
