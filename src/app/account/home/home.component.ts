import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Workout } from 'src/app/workout/models/workout';
import { WorkoutAnalysis } from 'src/app/workout/models/workout-analysis';
import { WorkoutService } from 'src/app/workout/services/workout.service';

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
  constructor(private workoutService: WorkoutService, private router: Router) {}

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
