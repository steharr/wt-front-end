import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorBannerService } from './core/error-banner/services/error-banner.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorBannerService: ErrorBannerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const e = new Error(error.error.message);
        this.errorBannerService.displayError(e);
        return throwError(() => e);
      })
    );
  }
}
