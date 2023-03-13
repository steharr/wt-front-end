import { Component, OnInit } from '@angular/core';
import { Workout } from 'src/app/workout/models/workout';
import { WorkoutService } from 'src/app/workout/services/workout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['exercise', 'sets', 'reps', 'weight'];
  dataSource: Workout[] = [];
  panelOpenState = false;
  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe({
      next: (workouts: Workout[]) => {
        this.dataSource = workouts;
      },
    });
  }
}
