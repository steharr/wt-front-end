import { ProgressType } from '../enums/progress-type.enum';

export interface ExerciseAnalysis {
  ratingProgression: number;
  repsProgression: number;
  weightProgression: ProgressType;
  lastRepsCount: number;
  lastSetsCount: number;
  lastWorkoutRating: number;
  comment: string;
}
