import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { ToastTypeEnum } from 'src/app/core/toast/enums/toast-type.enum';
import { ToastService } from 'src/app/core/toast/toast.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Workout } from 'src/app/workout/models/workout';
import { WorkoutAnalysis } from 'src/app/workout/models/workout-analysis';
import { WorkoutService } from 'src/app/workout/services/workout.service';
import { AccountDetails } from '../models/account-details.model';
import { AvatarOptions, Eyes, Hairs } from '../models/avatar-options.model';
import { AccountService } from '../services/account.service';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  STORAGE_KEY = '_sum';
  displayedColumns: string[] = ['exercise', 'sets', 'reps', 'weight'];
  dataSource: Workout[] = [];
  analysis: any;
  storageMap!: Map<number, WorkoutAnalysis>;
  private subs_: Subscription[] = [];

  panelOpenState = false;
  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getWorkouts();
    this.init();
  }

  ngOnDestroy(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getAnalysis(id: number) {
    if (!this.storageMap.has(id)) {
      this.workoutService.getAnalysis(id).subscribe({
        next: (analysis: WorkoutAnalysis) => {
          this.analysis = analysis;
          this.storageMap.set(id, this.analysis);
          this.updateStorage();
        },
      });
    } else {
      this.analysis = this.storageMap.get(id);
    }
  }

  onDeleteWorkout(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.workoutService.deleteWorkout(id).subscribe({
      next: (success) => {
        this.getWorkouts();
      },
      error: () => {},
    });
  }

  goToWorkout() {
    this.router.navigate(['workout']);
  }

  editProfile() {
    const dialogRef = this.dialog.open(EditProfileDialog, {});
  }

  private getWorkouts() {
    this.subs_.push(
      this.workoutService.getWorkouts().subscribe({
        next: (workouts: Workout[]) => {
          this.dataSource = workouts;
        },
      })
    );
  }
  private init() {
    const existingMapString = localStorage.getItem(this.STORAGE_KEY);
    if (existingMapString) {
      this.storageMap = new Map(JSON.parse(existingMapString));
    } else {
      this.storageMap = new Map([]);
      this.updateStorage();
    }
  }

  private updateStorage() {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(Array.from(this.storageMap.entries()))
    );
  }
}

@Component({
  selector: 'edit-profile-dialog',
  templateUrl: 'edit-profile-dialog.html',
  styleUrls: ['home.component.scss'],
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
export class EditProfileDialog implements OnInit {
  AVATAR_KEY: string = 'profile-avatar-95';
  profileAvatar!: Document;
  dirs = Direction;
  chg = AvatarChange;
  options!: AvatarOptions;
  details!: AccountDetails;
  form: FormGroup = this._formBuilder.group({
    rating: [null, Validators.required],
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AccountDetails,
    public dialogRef: MatDialogRef<EditProfileDialog>,
    private router: Router,
    private _formBuilder: FormBuilder,
    private accountService: AccountService,
    private avatarService: AvatarService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.accountService.details().subscribe({
      next: (details) => {
        this.details = details;
        this.profileAvatar = this.avatarService.createAvatar(details);
        this.avatarService.printAvatarToKey(
          this.profileAvatar,
          this.AVATAR_KEY,
          true
        );
      },
    });
    this.avatarService.options().subscribe({
      next: (data) => {
        this.options = data;
      },
    });
  }
  shift(change: AvatarChange, dir: Direction) {
    if (null !== this.options && null !== this.details) {
      this.updateAvatar(this.details, dir, change);
    }
  }

  save(): void {
    this.accountService.updateAvatar(this.details).subscribe({
      next: () => {
        this.toastService.bread({
          message: 'Successfully updated profile!',
          type: ToastTypeEnum.SUCCESS,
        });
        this.close();
      },
    });
  }
  close() {
    this.avatarService.updateUserAvatar(
      this.avatarService.createAvatar(this.details)
    );
    this.dialogRef.close();
  }

  private updateAvatar(
    accountDetails: AccountDetails,
    dir: Direction,
    change: AvatarChange
  ) {
    let newAccountDetails: AccountDetails = {
      ...this.details,
    };

    let choicesList =
      AvatarChange.HAIR == change
        ? this.options.hairChoices
        : this.options.eyeChoices;

    const currentAvatarDetail =
      AvatarChange.HAIR == change
        ? accountDetails.avatarHair
        : accountDetails.avatarEyes;
    const index = choicesList.findIndex((val) => val === currentAvatarDetail);
    const newIndex = index + (Direction.RIGHT == dir ? +1 : -1);

    if (AvatarChange.HAIR === change) {
      newAccountDetails.avatarHair = (choicesList as Hairs[])[newIndex];
    }
    if (AvatarChange.EYES === change) {
      newAccountDetails.avatarEyes = (choicesList as Eyes[])[newIndex];
    }
    this.avatarService.printAvatarToKey(
      this.avatarService.createAvatar(newAccountDetails),
      this.AVATAR_KEY,
      true
    );
    this.details = newAccountDetails;
  }
}
export enum AvatarChange {
  HAIR,
  EYES,
}
export enum Direction {
  LEFT,
  RIGHT,
}
