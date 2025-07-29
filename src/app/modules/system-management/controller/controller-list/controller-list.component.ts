import { Component } from '@angular/core';
import { ControllerModel } from '../models/controller.model';

@Component({
  selector: 'app-controller-list',
  templateUrl: './controller-list.component.html',
  styleUrl: './controller-list.component.scss'
})
export class ControllerListComponent {
  controllers: ControllerModel[] = [
    {
      ControllerName: 'User',
      RoleId: 1,
      Actions: []
    },
    {
      ControllerName: 'SysControllerActionRole',
      RoleId: 1,
      Actions: []
    },
    {
      ControllerName: 'WebSite',
      RoleId: 1,
      Actions: []
    },
    {
      ControllerName: 'WebPage',
      RoleId: 1,
      Actions: [
        { ActionName: 'List', ActionNo: 1, Active: true },
        { ActionName: 'View', ActionNo: 2, Active: true },
        { ActionName: 'Delete', ActionNo: 3, Active: true }
      ]
    },
    {
      ControllerName: 'ScheduleEvent',
      RoleId: 1,
      Actions: []
    },
    {
      ControllerName: 'Inquiry',
      RoleId: 1,
      Actions: []
    },
    {
      ControllerName: 'Message',
      RoleId: 1,
      Actions: []
    }
  ];

  editController(controller: ControllerModel) {
    // Edit işlemi burada yapılacak
    alert(controller.ControllerName + ' edit');
  }

  hasActiveActions(controller: ControllerModel): boolean {
    return controller.Actions && controller.Actions.some(a => a.Active);
  }
}
