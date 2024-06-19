import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CatVehicule } from 'src/app/models/CatVehicule';

@Injectable({
  providedIn: 'root',
})
export class CatvehiculeService {
  private apiUrl = `${environment.baseUrl}/AULSH/typevehicules`;

  constructor(private http: HttpClient) {}

  createTypeVehicule(typeVehicule: CatVehicule): Observable<CatVehicule> {
    return this.http.post<CatVehicule>(this.apiUrl, typeVehicule, this.httpOptions);
  }

  getTypeVehiculeById(id: number): Observable<CatVehicule> {
    return this.http.get<CatVehicule>(`${this.apiUrl}/${id}`);
  }

  getAllTypeVehicules(): Observable<CatVehicule[]> {
    return this.http.get<CatVehicule[]>(this.apiUrl);
  }

  updateTypeVehicule(id: number, typeVehicule: CatVehicule): Observable<CatVehicule> {
    return this.http.put<CatVehicule>(`${this.apiUrl}/${id}`, typeVehicule, this.httpOptions);
  }

  deleteTypeVehicule(id: number): Observable<void> {
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
