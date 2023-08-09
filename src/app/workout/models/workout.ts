import { Exercise } from './exercise';

export interface Workout {
  workoutId: number;
  exercises: Exercise[];
  date: Date;
  rating?: number;
}
