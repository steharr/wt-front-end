import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatStepper } from '@angular/material/stepper';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';
import { WorkoutService } from '../services/workout.service';

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

  constructor(private _formBuilder: FormBuilder,private _workoutSaveBottomSheet:MatBottomSheet, private workoutService: WorkoutService){}

  ngOnInit(): void {
    this.workoutService.getWorkout().subscribe(data=>console.dir(data));
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

  openBottomSheet(){
    const exercises: Exercise[] = [];
    this.exercises.forEach(exForm =>{
      exercises.push({
        exercise:exForm.controls['exercise'].value,
        reps:exForm.controls['reps'].value,
        sets:exForm.controls['sets'].value,
      });
    })

    const workout: Workout = {
      date:new Date(),
      exercise:exercises,
      rating:2,
      workoutId:10,
    }

    this._workoutSaveBottomSheet.open(WorkoutSaveBottomSheet, {
      data: { workout:  workout},
    });
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


@Component({
  selector: 'workout-save-bottom-sheet',
  templateUrl: 'workout-save-bottom-sheet.html',
})
export class WorkoutSaveBottomSheet {
  isLoading: boolean = false;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<WorkoutSaveBottomSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {workout: Workout},
    private workoutService:WorkoutService
    ) {}

  saveWorkout(): void {
  this.isLoading=true;
  this.workoutService.saveWorkout(this.data.workout).subscribe(
    {
      next:()=> this.isLoading=false,
      error:()=> this.isLoading=false,
      complete:()=> this.isLoading=false,
    })
  }

  close(){
    this._bottomSheetRef.dismiss();
  }
}