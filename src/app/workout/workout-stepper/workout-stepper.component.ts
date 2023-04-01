import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef,} from '@angular/material/bottom-sheet';
import {MatStepper} from '@angular/material/stepper';
import {Exercise} from '../models/exercise';
import {Workout} from '../models/workout';
import {WorkoutService} from '../services/workout.service';
import {WorkoutStepperUiService} from "../services/workout-stepper-ui.service";

@Component({
  selector: 'app-workout-stepper',
  templateUrl: './workout-stepper.component.html',
  styleUrls: ['./workout-stepper.component.scss'],
})
export class WorkoutStepperComponent implements OnInit {
  @ViewChild('stepper') private uiStepper!: MatStepper;

  dummyExerciseOptions = [
    'deadlifts',
    'bench press',
    'squat',
    'pull ups',
    'shoulder press',
  ];

  weights = [0];
  savedExercises = [false];
  exercises: FormGroup[] = [];
  commited = false;
  saveDots = 0;
  isLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _workoutSaveBottomSheet: MatBottomSheet,
    private workoutStepperUiService: WorkoutStepperUiService
  ) {
  }

  ngOnInit(): void {
    this.workoutStepperUiService.saveDots$.subscribe(value => {
      this.saveDots = value;
    })
    this.workoutStepperUiService.loading$.subscribe(value => {
      this.isLoading = value;
    })
    this.exercises.push(this.createEmptyExercise());
  }

  addToWorkout(exercise: FormGroup, stepIndex: number) {
    if (exercise.valid) {
      this.exercises.push(this.createEmptyExercise());
      this.savedExercises[stepIndex] = true;
      if (!this.commited) this.commited = true;
      setTimeout(() => this.uiStepper.next(), 0);
    }
  }

  updateWorkout(exercise: FormGroup, stepIndex: number) {
    if (exercise.valid) {
      this.exercises[stepIndex] = exercise;
      this.savedExercises[stepIndex] = true;
      setTimeout(() => this.uiStepper.next(), 0);
    }
  }

  onFormChange(stepIndex: number) {
    if (this.savedExercises[stepIndex]) {
      this.savedExercises[stepIndex] = false;
    }
  }

  openBottomSheet() {
    this._workoutSaveBottomSheet.open(WorkoutSaveBottomSheet, {
      data: {workout: this.getWorkoutFromForm()},
    });
  }

  private createEmptyExercise() {
    return this._formBuilder.group({
      exercise: ['', Validators.required],
      weight: [0, Validators.required],
      reps: [0, Validators.required],
      sets: [0, Validators.required],
      comment: [''],
    });
  }

  private getWorkoutFromForm(): Workout {
    const exercises: Exercise[] = [];

    this.exercises.forEach((exForm) => {
      exercises.push({
        exercise: exForm.controls['exercise'].value,
        reps: exForm.controls['reps'].value,
        sets: exForm.controls['sets'].value,
        weight: exForm.controls['weight'].value,
      });
    });

    return {
      date: new Date(),
      exercise: exercises,
      rating: 2,
      workoutId: 0,
    };
  }
}

@Component({
  selector: 'workout-save-bottom-sheet',
  templateUrl: 'workout-save-bottom-sheet.html',
})
export class WorkoutSaveBottomSheet {

  dots = 0;
  isLoading = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<WorkoutSaveBottomSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { workout: Workout },
    private workoutService: WorkoutService,
    private workoutStepperUiService: WorkoutStepperUiService
  ) {

    this.workoutStepperUiService.loading$.subscribe({
      next: (value) => {
        this.isLoading = value;
      }
    })
  }

  saveWorkout(): void {
    this.workoutStepperUiService.triggerDotsAnimation();
    this.workoutStepperUiService.setLoading(true);
    this.workoutStepperUiService.saveDots$.subscribe(value => this.dots = value);

    setTimeout(() => {
      this.workoutService.saveWorkout(this.data.workout).subscribe({
        next: () => (this.workoutStepperUiService.setLoading()),
        error: () => (this.workoutStepperUiService.setLoading()),
        complete: () => (this.workoutStepperUiService.setLoading()),
      });
    }, 10000);

  }

  close() {
    this._bottomSheetRef.dismiss();
  }

  range(limit: number) {
    const range = [];
    for (let i = 0; i < limit; i++) {
      range.push(i);
    }
    return range;
  }
}
