import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(token: string, newPassword: string): Observable<any> {
    // Define the request body containing token and newPassword
    const requestBody = { token, newPassword };

    // Make the POST request with the request body
    return this.http.post(environment.baseUrl + 'resetPassword', requestBody,{ responseType: 'text' });
  }
}
