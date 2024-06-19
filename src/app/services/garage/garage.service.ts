import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Garage } from 'src/app/models/garage';


@Injectable({
  providedIn: 'root',
})
export class GarageService {
  private apiUrl = `${environment.baseUrl}/AULSH/garages`;

  constructor(private http: HttpClient) {}

  createGarage(garage: Garage): Observable<Garage> {
    return this.http.post<Garage>(this.apiUrl, garage, this.httpOptions);
  }

  getGarageById(id: number): Observable<Garage> {
    return this.http.get<Garage>(`${this.apiUrl}/${id}`);
  }

  getAllGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(this.apiUrl);
  }

  updateGarage(id: number, garage: Garage): Observable<Garage> {
    return this.http.put<Garage>(`${this.apiUrl}/${id}`, garage, this.httpOptions);
  }

  deleteGarage(id: number): Observable<void> {
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
