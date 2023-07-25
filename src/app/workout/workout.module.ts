import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import {
  WorkoutSaveDialog,
  WorkoutStepperComponent,
} from './workout-stepper/workout-stepper.component';

@NgModule({
  declarations: [WorkoutStepperComponent],
  imports: [SharedModule, CoreModule, CommonModule],
  exports: [WorkoutStepperComponent],
  entryComponents: [WorkoutSaveDialog],
})
export class WorkoutModule {}
