import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading$ = this.accountService.loading$;
  hide = true;
  form: FormGroup = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private accountService: AccountService,
    private _fb: FormBuilder
  ) {}
  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.accountService.loginUser(this.form);
    }
  }
}
