import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../models/account-details.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private url: string = 'http://localhost:8080/account/';

  constructor(private http: HttpClient) {}

  details(): Observable<any> {
    return this.http.get<any>(this.url);
  }
  register(details: AccountDetails): Observable<Auth> {
    return this.http.post<Auth>(this.url + 'register', details);
  }
  login(details: AccountDetails): Observable<Auth> {
    return this.http.post<Auth>(this.url + 'login', details);
  }
}
