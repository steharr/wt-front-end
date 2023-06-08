import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorBannerService } from 'src/app/core/error-banner/services/error-banner.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  form: FormGroup = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private accountService: AccountService,
    private errorBannerService: ErrorBannerService,
    private _fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.accountService
        .login({
          ...this.form.value,
        })
        .subscribe({
          next: (res) => {
            this.storeToken(res.token);
            this.router.navigate(['/account/home']);
          },
          error: () => {
            this.errorBannerService.displayError(new Error('Please try again'));
          },
        });
    }
  }
  private storeToken(token: string) {
    localStorage.setItem('_wta', token);
  }
}
