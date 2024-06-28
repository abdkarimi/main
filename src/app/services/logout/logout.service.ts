import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }
  logout(): Observable<any> {
    return this.http.get(environment.baseUrl + '/logout');
  }

}
