import { ProgressType } from '../enums/progress-type.enum';

export interface ExerciseAnalysis {
  ratingProgression: number;
  repsProgression: number;
  weightProgression: ProgressType;
  lastRepsCount: number;
  comment: string;
}
