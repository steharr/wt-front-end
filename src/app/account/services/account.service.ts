import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../models/account-details.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private url: string = 'http://localhost:8080/account/register';

  constructor(private http: HttpClient) {}

  details(): Observable<any> {
    return this.http.get<any>(this.url);
  }
  register(details: AccountDetails): Observable<any> {
    return this.http.post<any>(this.url, details);
  }
}
