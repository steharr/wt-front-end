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

import { ErrorType } from './core/error-banner/enums/error-type.enum';
import { ErrorBannerService } from './core/error-banner/services/error-banner.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private errorBannerService: ErrorBannerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.filterForAuthentication(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        const e = new Error(error.error);
        this.handleApplicationError(e);
        return throwError(() => e);
      })
    );
  }

  private filterForAuthentication(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    const token = localStorage.getItem('_wta');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return request;
  }

  private handleApplicationError(error: Error) {
    this.errorBannerService.displayError({
      err: error,
      type: ErrorType.WARNING,
      temporary: true,
    });
  }
}
