import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorBannerService } from 'src/app/core/error-banner/services/error-banner.service';
import { ToastTypeEnum } from 'src/app/core/toast/enums/toast-type.enum';
import { ToastService } from 'src/app/core/toast/toast.service';
import { AccountDetails } from '../models/account-details.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private url: string = 'http://localhost:8080/account/';
  private TOKEN_KEY = '_wta';

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

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

  loginUser(details: FormGroup) {
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
        this.router.navigate(['/account/home']);
      },
      error: () => {
        this.errorBannerService.displayError(new Error('Please try again'));
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
        this.errorBannerService.displayError(new Error('Please try again'));
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
