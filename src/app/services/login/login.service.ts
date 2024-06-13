import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginRequest: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'login', loginRequest);
  }

  hello(): Observable<any> {
    return this.http.get(environment.baseUrl + 'AULSH/hello', {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      );
    } else {
      console.log("JWT token not found in local storage");
      return new HttpHeaders();
    }
  }
}
