import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Modele } from 'src/app/models/Modele';


@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  private apiUrl = `${environment.baseUrl}/AULSH/modeles`;

  constructor(private http: HttpClient) { }

  getAllModeles(): Observable<Modele[]> {
    return this.http.get<Modele[]>(this.apiUrl);
  }

  getModeleById(id: number): Observable<Modele> {
    return this.http.get<Modele>(`${this.apiUrl}/${id}`);
  }

  createModele(modele: Modele): Observable<Modele> {
    return this.http.post<Modele>(this.apiUrl, modele);
  }

  updateModele(id: number, modele: Modele): Observable<Modele> {
    return this.http.put<Modele>(`${this.apiUrl}/${id}`, modele);
  }

  deleteModele(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
