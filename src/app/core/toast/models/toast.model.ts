import { ToastTypeEnum } from '../enums/toast-type.enum';

export interface ToastModel {
  message: string;
  show?: boolean;
  type: ToastTypeEnum;
}
