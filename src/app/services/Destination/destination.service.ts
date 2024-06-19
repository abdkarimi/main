import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Destination } from 'src/app/models/Destination';


@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private apiUrl = `${environment.baseUrl}/AULSH/destinations`;

  constructor(private http: HttpClient) {}

  createDestination(destination: Destination): Observable<Destination> {
    return this.http.post<Destination>(this.apiUrl, destination, this.httpOptions);
  }

  getDestinationById(id: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}/${id}`);
  }

  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.apiUrl);
  }

  updateDestination(id: number, destination: Destination): Observable<Destination> {
    return this.http.put<Destination>(`${this.apiUrl}/${id}`, destination, this.httpOptions);
  }

  deleteDestination(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
