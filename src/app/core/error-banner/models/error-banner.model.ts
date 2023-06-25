import { ErrorType } from '../enums/error-type.enum';

export interface ErrorBanner {
  err: Error;
  type: ErrorType;
  id?: number;
}
