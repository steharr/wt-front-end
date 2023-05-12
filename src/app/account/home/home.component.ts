import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['exercise', 'sets', 'reps', 'weight'];
  dataSource: Workout[] = [];
  analysis: any;
  private subs_: Subscription[] = [];

  panelOpenState = false;
  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit(): void {
    this.getWorkouts();
  }

  getAnalysis(id: number) {
    this.workoutService.getAnalysis(id).subscribe({
      next: (analysis: WorkoutAnalysis) => {
        this.analysis = analysis;
      },
    });
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

  private getWorkouts() {
    this.subs_.push(
      this.workoutService.getWorkouts().subscribe({
        next: (workouts: Workout[]) => {
          this.dataSource = workouts;
        },
      })
    );
  }

  goToWorkout() {
    this.router.navigate(['workout']);
  }
}
