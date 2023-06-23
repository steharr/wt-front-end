import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env';
import { Workout } from '../models/workout';
import { WorkoutAnalysis } from '../models/workout-analysis';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private url: string = environment.url;

  constructor(private http: HttpClient) {}

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.url + '/home');
  }
  saveWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(this.url, workout);
  }
  getAnalysis(id: number): Observable<WorkoutAnalysis> {
    return this.http.get<WorkoutAnalysis>(this.url + `/analysis/${id}`);
  }
  deleteWorkout(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(this.url + `/${id}`);
  }
}
