import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-workout-stepper',
  templateUrl: './workout-stepper.component.html',
  styleUrls: ['./workout-stepper.component.scss']
})
export class WorkoutStepperComponent implements OnInit {

  @ViewChild('stepper') private uiStepper!: MatStepper;

  // TODO: update from back end
  dummyExerciseOptions = [
    'deadlifts',
    'bench press',
    'squat',
    'pull ups',
    'shoulder press',
  ]

  weights =[0]
  savedExercises=[false];
  exercises: FormGroup[] = [];
  commited = false;

  constructor(private _formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.exercises.push(this.createEmptyExercise());
  }

  addToWorkout(exercise: FormGroup, stepIndex: number){
    if (exercise.valid){
      this.exercises.push(this.createEmptyExercise());
      this.savedExercises[stepIndex] = true;
      if (!this.commited)
        this.commited = true;
      setTimeout(()=>this.uiStepper.next(),0);
    }
  }
  updateWorkout(exercise: FormGroup, stepIndex: number){
    if (exercise.valid){
      this.exercises[stepIndex] = exercise;
      this.savedExercises[stepIndex] = true;
      setTimeout(()=>this.uiStepper.next(),0);
    }
  }

  onFormChange(stepIndex: number){
    if (this.savedExercises[stepIndex]){
      this.savedExercises[stepIndex] = false;
    }
  }

  private createEmptyExercise(){
    return this._formBuilder.group({
      exercise: ['', Validators.required],
      weight: [0, Validators.required],
      reps: [0, Validators.required],
      sets: [0, Validators.required],
      comment: ['',],
    });
  }


}
