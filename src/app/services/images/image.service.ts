// image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  fetchImage(imageName: string): Observable<string> {
    const jwtToken = localStorage.getItem('jwtToken');
    const url = `http://localhost:8181/AULSH/uploads/${imageName}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get(url, { headers: headers, responseType: 'blob' }).pipe(
      map((response: Blob) => {
        return URL.createObjectURL(response); // Convert blob to URL
      })
    );
  }
}
  