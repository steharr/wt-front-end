import { Workout } from './workout';

export interface WorkoutAnalysis {
  workout: Workout;
  numberOfExercises: number;
  avgWeight: number;
  avgReps: number;
}
