import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vehicule } from 'src/app/models/Vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = `${environment.baseUrl}/AULSH/vehicules`;

  constructor(private http: HttpClient) {}

  getAllVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }

  getVehiculeById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/${id}`);
  }

  saveVehicule(vehicule: Vehicule, file: File): Observable<Vehicule> {
    const formData = new FormData();
    formData.append('vehicule', JSON.stringify(vehicule));
    formData.append('file', file);

    return this.http.post<Vehicule>(this.apiUrl, formData);
  }

  updateVehicule(id: number, vehicule: Vehicule, file?: File): Observable<Vehicule> {
    const formData = new FormData();
    formData.append('vehicule', JSON.stringify(vehicule));
    if (file) {
      formData.append('file', file);
    }

    return this.http.put<Vehicule>(`${this.apiUrl}/${id}`, formData);
  }

  deleteVehicule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
