import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WorkoutModule } from '../workout/workout.module';
import { AccountRoutingModule } from './account-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './home/profile.component';
import { WorkoutSummaryComponent } from './home/workout-summary.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    WorkoutSummaryComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [AccountRoutingModule, SharedModule, CommonModule, WorkoutModule],
  exports: [RegisterComponent],
})
export class AccountModule {}
