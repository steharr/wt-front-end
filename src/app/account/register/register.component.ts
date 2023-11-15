import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvatarDetails } from 'src/app/core/avatar-editor/models/avatar-details.model';
import { GenderTypeEnum } from '../enums/gender-type.enum';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  genders = GenderTypeEnum;
  form: FormGroup = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, Validators.required],
    gender: ['', Validators.required],
    username: ['', Validators.required],
    passwordConfirm: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', Validators.required],
    avatarDetails: ['', Validators.required],
  });
  constructor(
    private accountService: AccountService,
    private _fb: FormBuilder
  ) {}
  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.accountService.registerUser(this.form);
    }
  }
  onChangeAvatar($event: AvatarDetails) {
    this.form.patchValue({ avatarDetails: JSON.stringify($event) });
  }
}
