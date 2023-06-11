import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastTypeEnum } from './enums/toast-type.enum';
import { ToastModel } from './models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private message = new Subject<string>();
  public message$ = this.message.asObservable();

  private show = new Subject<boolean>();
  public show$ = this.show.asObservable();

  private type = new Subject<ToastTypeEnum>();
  public type$ = this.type.asObservable();

  private toast = new Subject<ToastModel>();
  public toast$ = this.toast.asObservable();

  constructor() {}

  bread(toast: ToastModel) {
    this.message.next(toast.message);
    this.show.next(toast.show ? toast.show : true);
    this.type.next(toast.type);
    this.toast.next(toast);
  }
}
