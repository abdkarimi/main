import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdreMission } from 'src/app/models/OrdreMission';

@Injectable({
  providedIn: 'root'
})
export class OrdremissionService {

  private baseUrl = 'http://localhost:8181/AULSH/ordremissions'; 

  constructor(private http: HttpClient) { }

  createOrdreMission(ordreMission: OrdreMission): Observable<OrdreMission> {
    return this.http.post<OrdreMission>(`${this.baseUrl}`, ordreMission);
  }

  getOrdreMissionById(id: number): Observable<OrdreMission> {
    return this.http.get<OrdreMission>(`${this.baseUrl}/${id}`);
  }

  getAllOrdreMissions(): Observable<OrdreMission[]> {
    return this.http.get<OrdreMission[]>(`${this.baseUrl}`);
  }

  updateOrdreMission(id: number, ordreMission: OrdreMission): Observable<OrdreMission> {
    return this.http.put<OrdreMission>(`${this.baseUrl}/${id}`, ordreMission);
  }

  deleteOrdreMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllOrdreMissionOfDepartement(departementId: number): Observable<OrdreMission[]> {
    return this.http.get<OrdreMission[]>(`${this.baseUrl}/departement/${departementId}`);
  }
}
