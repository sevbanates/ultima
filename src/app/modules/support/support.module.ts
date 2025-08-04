import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupportListComponent } from './components/support-list/support-list.component';
import { SupportDetailComponent } from './components/support-detail/support-detail.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { supportDetailResolver, supportListResolver } from './services/support.resolver';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { ResourceOwnerGuard } from 'src/app/core/auth/guards/resource-owner.guard';
import { Controllers } from 'src/app/core/enums/actions-enum/controllers.enum';
import { TicketActions } from 'src/app/core/enums/actions-enum/actions.enum';

const routes: Routes = [
  {
    path: '',
    component: SupportListComponent,
    canActivate: [AuthGuard],
    resolve: {
      supportListResolver
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
    component: SupportDetailComponent,
    canActivate: [AuthGuard, ResourceOwnerGuard],
    resolve: {
      supportDetailResolver
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
export class SupportModule { } 