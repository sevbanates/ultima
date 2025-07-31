import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupportListComponent } from './components/support-list/support-list.component';
import { SupportDetailComponent } from './components/support-detail/support-detail.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: SupportListComponent
  },
  {
    path: 'create',
    component: CreateTicketComponent
  },
  {
    path: ':id',
    component: SupportDetailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SupportModule { } 