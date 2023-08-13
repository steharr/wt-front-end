import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorType } from 'src/app/core/error-banner/enums/error-type.enum';
import { ErrorBannerService } from 'src/app/core/error-banner/services/error-banner.service';
import { ToastTypeEnum } from 'src/app/core/toast/enums/toast-type.enum';
import { ToastService } from 'src/app/core/toast/toast.service';
import { environment } from 'src/environments/environment';
import { AccountDetails } from '../models/account-details.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private url: string = environment.url + '/account/';
  private TOKEN_KEY = '_wta';

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  constructor(
    private http: HttpClient,
    private errorBannerService: ErrorBannerService,
    private toastService: ToastService,
    private _fb: FormBuilder,
    private router: Router
  ) {}

  details(): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(this.url + 'details');
  }

  updateAvatar(details: AccountDetails): Observable<void> {
    return this.http.patch<void>(this.url + 'avatar', details);
  }

  loginUser(details: FormGroup) {
    this.loading.next(true);
    this.login({
      ...details.value,
    }).subscribe({
      next: (res) => {
        this.storeToken(res.token);
        this.updateLoginStatus(true);
        this.toastService.bread({
          message: 'Login Successful!',
          type: ToastTypeEnum.SUCCESS,
          show: true,
        });
        this.loading.next(false);
        this.router.navigate(['/account/home']);
      },
      error: () => {
        this.loading.next(false);
      },
    });
  }
  registerUser(details: FormGroup) {
    this.register({
      ...details.value,
    }).subscribe({
      next: (res) => {
        this.storeToken(res.token);
        this.updateLoginStatus(true);
      },
      error: () => {
        this.errorBannerService.displayError({
          err: new Error('Error registering user, Please try again'),
          type: ErrorType.WARNING,
        });
      },
    });
  }
  logoutUser() {
    this.clearToken();
    this.updateLoginStatus(false);
    this.router.navigate(['/']);
  }
  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }
  private register(details: AccountDetails): Observable<Auth> {
    return this.http.post<Auth>(this.url + 'register', details);
  }
  private login(details: AccountDetails): Observable<Auth> {
    return this.http.post<Auth>(this.url + 'login', details);
  }
  private storeToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  private clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
