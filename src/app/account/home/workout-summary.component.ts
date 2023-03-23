import { Component, Input } from '@angular/core';
import { WorkoutAnalysis } from 'src/app/workout/models/workout-analysis';

@Component({
  selector: 'app-workout-summary',
  templateUrl: './workout-summary.component.html',
  styleUrls: ['./workout-summary.component.scss'],
})
export class WorkoutSummaryComponent {
  @Input() analysis!: WorkoutAnalysis;

  constructor() {}
}
