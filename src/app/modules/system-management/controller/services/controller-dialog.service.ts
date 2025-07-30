import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ControllerModel } from '../models/controller.model';
import { ControllerDetailsComponent } from '../controller-details/controller-details.component';

export interface ControllerDialogData {
  roleId: number;
  controller: ControllerModel;
}

@Injectable({
  providedIn: 'root'
})
export class ControllerDialogService {

  constructor(private dialog: MatDialog) { }

  openControllerDetailsDialog(data: ControllerDialogData): MatDialogRef<ControllerDetailsComponent> {
    return this.dialog.open(ControllerDetailsComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      data: data,
      disableClose: false,
      panelClass: 'controller-dialog',
      autoFocus: false
    });
  }
} 