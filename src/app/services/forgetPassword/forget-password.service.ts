import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http: HttpClient) { }
  forgetPassword(email: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'forgetPassword', email, { responseType: 'text' });
  }
}
