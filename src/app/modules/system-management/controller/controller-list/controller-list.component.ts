import { Component, OnInit } from '@angular/core';
import { ControllerModel } from '../models/controller.model';
import { SelectNumberModel } from 'src/app/core/models/utility-model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ControllerService } from '../services/controller.service';
import { ControllerDialogService } from '../services/controller-dialog.service';

@Component({
  selector: 'app-controller-list',
  templateUrl: './controller-list.component.html',
  styleUrl: './controller-list.component.scss'
})
export class ControllerListComponent implements OnInit {
  selectedRole:SelectNumberModel;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isLoading: boolean = false;

  /**
   *
   */
  constructor(
    private controllerService: ControllerService,
    private controllerDialogService: ControllerDialogService
  ) {
    
    
  }

  roles$:Observable<Array<SelectNumberModel>>;

  
  controllers: ControllerModel[];

  ngOnInit(): void {
    this.roles$ = this.controllerService.roles$;
  }


  editController(controller: ControllerModel) {
    // Controller objesinin deep copy'sini al
    const controllerCopy = this.deepCopyController(controller);
    
    const dialogRef = this.controllerDialogService.openControllerDetailsDialog({
      roleId: this.selectedRole.Value,
      controller: controllerCopy
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log('Dialog closed with success:', result.data);
        // Dialog'dan gelen güncellenmiş controller'ı ana listeye uygula
        this.updateControllerInList(controller, result.data);
      }
    });
  }

  private deepCopyController(controller: ControllerModel): ControllerModel {
    return {
      ...controller,
      Actions: controller.Actions ? controller.Actions.map(action => ({
        ...action
      })) : []
    };
  }

  private updateControllerInList(originalController: ControllerModel, updatedController: ControllerModel): void {
    const index = this.controllers.findIndex(c => c === originalController);
    if (index !== -1) {
      this.controllers[index] = updatedController;
    }
  }

  hasActiveActions(controller: ControllerModel): boolean {
    return controller.Actions && controller.Actions.some(a => a.Active);
  }


  filterByRole(role: SelectNumberModel): void
  {
      this.selectedRole=role;
      this.isLoading = true;
      this.controllerService.getControllersByRoleId(role.Value).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
        this.controllers=res.EntityList;
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
        console.error('Error loading controllers:', error);
      });
  }


  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }
}
