import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorBanner } from '../models/error-banner.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorBannerService {
  error$: Subject<ErrorBanner> = new Subject();

  displayError(error: ErrorBanner) {
    this.error$.next(error);
  }
}
