import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutStepperComponent } from './workout/workout-stepper/workout-stepper.component';

const routes: Routes = [
  {path:'',component:WorkoutStepperComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
