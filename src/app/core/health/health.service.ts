import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  private serviceAvailable = new BehaviorSubject<boolean>(false);
  serviceAvailable$ = this.serviceAvailable.asObservable();

  private url: string = environment.url + '/conf/';

  constructor(private http: HttpClient) {}

  isAlive(): Observable<void> {
    return this.http.get<void>(this.url + 'health');
  }

  updateServiceAvailable(value: boolean) {
    this.serviceAvailable.next(value);
  }

  checkHealthStatus() {
    this.loading.next(true);
    this.isAlive().subscribe({
      next: () => {
        this.updateServiceAvailable(true);
        this.loading.next(false);
      },
      error: () => {
        this.updateServiceAvailable(false);
        this.loading.next(false);
      },
    });
  }
}
