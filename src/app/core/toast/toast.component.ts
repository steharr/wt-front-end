import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
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
          this.open(toast.message);
        } else if (null === this._snackBar._openedSnackBarRef) {
          this.close();
        }
      },
    });
  }

  open(value: string) {
    this._snackBar.openFromComponent(WtToastComponent, {
      duration: 5000,
      data: {
        message: value,
      },
    });
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

  constructor(
    private _ref: MatSnackBarRef<WtToastComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.message = data.message;
  }

  close() {
    this._ref.dismiss();
  }
}
