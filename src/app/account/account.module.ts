import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    AccountRoutingModule,
    SharedModule,
    CommonModule
  ] , exports:[
    RegisterComponent
  ]
})
export class AccountModule { }
