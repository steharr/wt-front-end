import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorBannerService {
  error$: Subject<Error | null> = new Subject();

  displayError(error: Error) {
    this.error$.next(error);
  }

  clearError() {
    this.error$.next(null);
  }
}
