import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ToastTypeEnum } from './enums/toast-type.enum';
import { ToastModel } from './models/toast.model';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _snackBar: MatSnackBar,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe({
      next: (toast: ToastModel) => {
        if (toast.show) {
          this.open(toast);
        } else if (null === this._snackBar._openedSnackBarRef) {
          this.close();
        }
      },
    });
  }

  open(toast: ToastModel) {
    let style = 'workout-tracker-toast';
    if (toast.type === ToastTypeEnum.HELP) {
      style += '-help';
    }
    const config: MatSnackBarConfig<any> = {
      data: {
        message: toast.message,
        type: toast.type,
      },
      panelClass: style,
    };

    if (toast.type !== ToastTypeEnum.HELP) {
      config.duration = 5000;
    }

    this._snackBar.openFromComponent(WtToastComponent, config);
  }
  close() {
    this._snackBar.dismiss();
  }
}

@Component({
  selector: 'wt-toast-component',
  templateUrl: 'wt-toast-component.html',
  styleUrls: ['wt-toast-component.scss'],
})
export class WtToastComponent {
  message: string = '';
  type: ToastTypeEnum = ToastTypeEnum.INFO;
  types = ToastTypeEnum;

  constructor(
    private _ref: MatSnackBarRef<WtToastComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.message = data.message;
    this.type = data.type;
  }

  close() {
    this._ref.dismiss();
  }
}
