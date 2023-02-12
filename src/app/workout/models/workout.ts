import { Exercise } from "./exercise";

export interface Workout {
     workoutId:number,
     exercise: Exercise[],
     date:Date,
     rating:number,
}
