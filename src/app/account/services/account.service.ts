import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AvatarDetails } from 'src/app/core/avatar-editor/models/avatar-details.model';
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
    this.register(this.extractRegisterData(details)).subscribe({
      next: (res) => {
        this.storeToken(res.token);
        this.updateLoginStatus(true);
        this.toastService.bread({
          message: 'Register Successful!',
          type: ToastTypeEnum.SUCCESS,
          show: true,
        });
        this.router.navigate(['/home']);
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
  usernameExists(username: string): Observable<any> {
    return this.http.get<any>(this.url + `username-exists?check=${username}`);
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
  public hasToken() {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  private extractRegisterData(form: FormGroup): AccountDetails {
    const step1 = form.controls['step1'] as FormGroup;
    const step2 = form.controls['step2'] as FormGroup;
    const step3 = form.controls['step3'] as FormGroup;
    const avatarForm: AvatarDetails = JSON.parse(
      step2.controls['avatarDetails'].value
    );
    return {
      username: step1.controls['username'].value,
      email: step1.controls['email'].value,

      age: step2.controls['age'].value,
      avatarEyes: avatarForm.avatarEyes,
      avatarHair: avatarForm.avatarHair,
      firstName: step2.controls['firstName'].value,
      gender: step2.controls['gender'].value,
      lastName: step2.controls['lastName'].value,

      password: step3.controls['password'].value,
    };
  }
}
