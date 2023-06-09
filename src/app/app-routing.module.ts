import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRoutingModule } from './account/account-routing.module';
import { LoginComponent } from './account/login/login.component';
import { WorkoutStepperComponent } from './workout/workout-stepper/workout-stepper.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'workout', component: WorkoutStepperComponent },
  { path: 'account', loadChildren: () => AccountRoutingModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
