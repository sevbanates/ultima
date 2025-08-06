import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './components/support-list/ticket-list.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { ticketDetailResolver, ticketListResolver } from './services/support.resolver';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { ResourceOwnerGuard } from 'src/app/core/auth/guards/resource-owner.guard';
import { Controllers } from 'src/app/core/enums/actions-enum/controllers.enum';
import { TicketActions } from 'src/app/core/enums/actions-enum/actions.enum';
import { TicketDetailComponent } from './components/support-detail/ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TicketListComponent,
    canActivate: [AuthGuard],
    resolve: {
      ticketListResolver
    },
    data: {
      controllerName: Controllers.Ticket,
      action: TicketActions.List
    }
  },
  {
    path: 'create',
    component: CreateTicketComponent,
    canActivate: [AuthGuard],
    data: {
      controllerName: Controllers.Ticket,
      action: TicketActions.Save
    }
  },
  {
    path: ':id/:guidId',
    component: TicketDetailComponent,
    canActivate: [AuthGuard, ResourceOwnerGuard],
    resolve: {
      ticketDetailResolver
    },
    data: {
      controllerName: Controllers.Ticket,
      action: TicketActions.View
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
export class TicketModule { } 