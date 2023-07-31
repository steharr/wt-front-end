import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExerciseType } from '../models/exericise-type';
import { Workout } from '../models/workout';
import { WorkoutAnalysis } from '../models/workout-analysis';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private url: string = environment.url + '/workout/';

  constructor(private http: HttpClient) {}

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.url + 'home');
  }
  getTypes(): Observable<ExerciseType[]> {
    return this.http.get<ExerciseType[]>(this.url + 'exercises');
  }
  saveWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(this.url + 'save', workout);
  }
  getAnalysis(id: number): Observable<WorkoutAnalysis> {
    return this.http.get<WorkoutAnalysis>(this.url + `analysis/${id}`);
  }
  deleteWorkout(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(this.url + `${id}`);
  }
}
