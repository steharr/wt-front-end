import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AvatarDefaults } from 'src/app/core/avatar-editor/constants/avatar-defaults.constant';
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

  step1: FormGroup = this._fb.group({
    username: ['dev2', Validators.required],
    email: ['abc@gmail.com', [Validators.required, Validators.email]],
  });

  step2: FormGroup = this._fb.group({
    avatarDetails: [
      JSON.stringify({
        avatarEyes: AvatarDefaults.DEFAULT_EYES,
        avatarHair: AvatarDefaults.DEFAULT_HAIR,
      }),
      Validators.required,
    ],
    firstName: ['Stephen', Validators.required],
    lastName: ['Harrold', Validators.required],
    age: [29, Validators.required],
    gender: [GenderTypeEnum.MALE, Validators.required],
  });

  step3: FormGroup = this._fb.group({
    passwordConfirm: ['test', [Validators.required]],
    password: ['test', [Validators.required]],
  });

  form: FormGroup = this._fb.group({
    step1: this.step1,
    step2: this.step2,
    step3: this.step3,
  });

  constructor(
    private accountService: AccountService,
    private _fb: FormBuilder
  ) {}
  ngOnInit(): void {}

  submit() {
    if (
      this.step3.controls['password'].value !==
      this.step3.controls['passwordConfirm'].value
    ) {
      this.step3.controls['passwordConfirm'].setErrors({
        passwordNoMatch: true,
      });
    }

    if (this.form.valid) {
      this.accountService.registerUser(this.form);
    }
  }
  onChangeAvatar($event: AvatarDetails) {
    this.step2.patchValue({ avatarDetails: JSON.stringify($event) });
  }

  validateStep1(stepper: MatStepper) {
    if (this.step1.valid) {
      const formUsername = this.step1.controls['username'];
      this.accountService.usernameExists(formUsername.value).subscribe({
        next: (exists) => {
          exists
            ? formUsername.setErrors({ notUnique: true })
            : this.next(stepper);
        },
      });
    }
  }

  next(stepper: MatStepper) {
    stepper.next();
  }
}
