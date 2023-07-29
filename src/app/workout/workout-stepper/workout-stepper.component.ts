import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Exercise } from '../models/exercise';
import { ExerciseType } from '../models/exericise-type';
import { Workout } from '../models/workout';
import { WorkoutStepperUiService } from '../services/workout-stepper-ui.service';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-workout-stepper',
  templateUrl: './workout-stepper.component.html',
  styleUrls: ['./workout-stepper.component.scss'],
})
export class WorkoutStepperComponent implements OnInit {
  @ViewChild('stepper') private uiStepper!: MatStepper;

  types: ExerciseType[] = [];
  weights = [0];
  savedExercises = [false];
  exercises: FormGroup[] = [];
  commited = false;
  saveDots = 0;
  isLoading = false;
  activeStepIndex = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private workoutStepperUiService: WorkoutStepperUiService,
    private workoutService: WorkoutService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.workoutStepperUiService.saveDots$.subscribe((value) => {
      this.saveDots = value;
    });
    this.workoutStepperUiService.loading$.subscribe((value) => {
      this.isLoading = value;
    });
    this.exercises.push(this.createEmptyExercise());

    this.workoutService.getTypes().subscribe({
      next: (types) => {
        this.types = types;
      },
    });
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
    const dialogRef = this.dialog.open(WorkoutSaveDialog, {
      data: this.getWorkoutFromForm(),
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
      workoutId: 0,
    };
  }
}

@Component({
  selector: 'workout-save-dialog',
  templateUrl: 'workout-save-dialog.html',
  styleUrls: ['workout-stepper.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgIf,
    NgFor,
    CoreModule,
    SharedModule,
  ],
})
export class WorkoutSaveDialog implements OnInit {
  dots = 0;
  isLoading = false;
  workout!: Workout;
  form: FormGroup = this._formBuilder.group({
    rating: [null, Validators.required],
  });
  stars = -1;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<WorkoutSaveDialog>,
    private workoutService: WorkoutService,
    private workoutStepperUiService: WorkoutStepperUiService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.workoutStepperUiService.loading$.subscribe({
      next: (value) => {
        this.isLoading = value;
      },
    });
  }
  ngOnInit(): void {
    this.workout = this.data as Workout;
    this.form.controls['rating'].valueChanges.subscribe({
      next: (value) => {
        this.stars = value;
      },
    });
  }

  saveWorkout(): void {
    if (this.form.valid) {
      this.workoutStepperUiService.triggerDotsAnimation();
      this.workoutStepperUiService.setLoading(true);
      this.workoutStepperUiService.saveDots$.subscribe(
        (value) => (this.dots = value)
      );

      this.saveRating();

      setTimeout(() => {
        this.workoutService.saveWorkout(this.workout).subscribe({
          next: () => {
            this.router.navigate(['/home']);
            this.workoutStepperUiService.setLoading();
          },
          error: () => {
            this.workoutStepperUiService.setLoading();
          },
          complete: () => {
            this.workoutStepperUiService.setLoading();
            this.close();
          },
        });
      }, 500);
    }
  }

  saveRating() {
    this.workout.rating = this.form.controls['rating'].value;
  }

  close() {
    this.dialogRef.close();
  }

  range(limit: number, start: number = 0) {
    const range = [];
    for (let i = start; i <= limit; i++) {
      range.push(i);
    }
    return range;
  }
}
