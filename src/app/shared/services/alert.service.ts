import { Injectable, EventEmitter, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private duration = 5000;
  private action = '';
  private _translateService: TranslocoService = inject(TranslocoService)
  public progressBarUIEvent: EventEmitter<any>;

  constructor(public snackBar: MatSnackBar) {
    this.progressBarUIEvent = new EventEmitter();
  }

  public startProgressBar() {
    this.progressBarUIEvent.emit(true);
  }

  public stopProgressBar() {
    this.progressBarUIEvent.emit(false);
  }

  public ShowSuccessMessage(message: string) {

    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.duration;
    config.panelClass = ['successMessage'];

    this.snackBar.open(this._translateService.translate(message), this.action, config);

    this.stopProgressBar();

  }

  public ShowErrorMessage(message: string) {

    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.duration;
    config.panelClass = ['errorMessage'];

    this.snackBar.open(this._translateService.translate(message), this.action, config);

    this.stopProgressBar();

  }

  public ShowWarningMessage(message: string) {

    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.duration;
    config.panelClass = ['warningMessage'];

    this.snackBar.open(this._translateService.translate(message), this.action, config);

    this.stopProgressBar();

  }

}