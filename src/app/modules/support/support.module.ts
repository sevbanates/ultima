import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupportListComponent } from './components/support-list/support-list.component';
import { SupportDetailComponent } from './components/support-detail/support-detail.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { supportDetailResolver, supportListResolver } from './services/support.resolver';

const routes: Routes = [
  {
    path: '',
    component: SupportListComponent,
    resolve: {
      supportListResolver
    }
  },
  {
    path: 'create',
    component: CreateTicketComponent
  },
  {
    path: ':id/:guidId',
    component: SupportDetailComponent,
    resolve: {
      supportDetailResolver
    }
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