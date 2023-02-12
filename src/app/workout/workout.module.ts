import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { WorkoutSaveBottomSheet, WorkoutStepperComponent } from './workout-stepper/workout-stepper.component';



@NgModule({
  declarations: [
    WorkoutStepperComponent,
    WorkoutSaveBottomSheet
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
  ], 
  exports:[
    WorkoutStepperComponent,
    WorkoutSaveBottomSheet
  ]
})
export class WorkoutModule { }
