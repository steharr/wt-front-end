import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private url: string = 'http://localhost:8080/workout';

  constructor(private http:HttpClient) { }

  getWorkout():Observable<Workout>{
      return this.http.get<Workout>(this.url);
  }

  saveWorkout(workout: Workout):Observable<Workout>{
      return this.http.post<Workout>(this.url, workout);
  }
  
}
