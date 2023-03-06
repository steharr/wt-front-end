import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { WorkoutModule } from '../workout/workout.module';

@NgModule({
  declarations: [RegisterComponent, HomeComponent],
  imports: [AccountRoutingModule, SharedModule, CommonModule, WorkoutModule],
  exports: [RegisterComponent],
})
export class AccountModule {}
