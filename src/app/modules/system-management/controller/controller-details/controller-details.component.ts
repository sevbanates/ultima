import { ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ControllerActionModel, ControllerModel } from '../models/controller.model';
import { ControllerDialogData } from '../services/controller-dialog.service';
import { ControllerService } from '../services/controller.service';
import { Subject, takeUntil } from 'rxjs';
import { dA } from '@fullcalendar/core/internal-common';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-controller-details',
  templateUrl: './controller-details.component.html',
  styleUrl: './controller-details.component.scss'
})
export class ControllerDetailsComponent implements OnInit {
  roleId: number;
  controller: ControllerModel;
  selectedActions = [] as ControllerActionModel[];
  private _alertService: AlertService = inject(AlertService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _controllerService: ControllerService,
    public dialogRef: MatDialogRef<ControllerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ControllerDialogData
  ) {
    this.roleId = data.roleId;
    this.controller = data.controller;
    this.selectedActions = this.controller.Actions.filter(x => x.Active === true);
  }

  ngOnInit(): void {

    // this._controllerService.controller$
    // .pipe(takeUntil(this._unsubscribeAll))
    // .subscribe((controller) => {
    //     this.controller = controller;
    //     this.selectedActions = controller.Actions.filter(x => x.Active === true);
    //     this._changeDetectorRef.markForCheck();
    // });
    // Component başlatıldığında çalışacak kodlar
  }

  onToggleChange(controller: ControllerModel, action: ControllerActionModel): void {
    if (this.isControllerHasAction(controller, action)) {
      this.selectedActions = this.selectedActions.filter(item => item.ActionNo !== action.ActionNo);
  }
  else {
      this.selectedActions.push(action);
  }
  }

  isControllerHasAction(controller: ControllerModel, action: ControllerActionModel): boolean {
    return !!this.selectedActions.find(item => item.ActionNo === action.ActionNo);
}


  onSave(): void {

    let controllerActionList = [] as ControllerActionModel[];
    this.selectedActions.forEach(action => {
        let controllerAction = {} as ControllerActionModel;
        controllerAction.ActionName = action.ActionName;
        controllerAction.ActionNo = action.ActionNo;
        controllerActionList.push(controllerAction);
    })
    this._controllerService.saveControllerActions({ ControllerName: this.controller.ControllerName, RoleId: this.roleId, Actions: controllerActionList }).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
        if (res.IsSuccess) {
            this._alertService.ShowSuccessMessage("Başarıyla kaydedildi");
            this.dialogRef.close({ success: true, data: this.controller });
          }
    })
    // Değişiklikleri kaydet
    console.log('Saving controller details:', this.controller);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
