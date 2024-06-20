import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Structure } from 'src/app/models/Structure';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  private apiUrl = `${environment.baseUrl}/AULSH/structures`;

  constructor(private http: HttpClient) {}

  creerStructure(structure: Structure): Observable<Structure> {
    return this.http.post<Structure>(this.apiUrl, structure, this.httpOptions);
  }

  obtenirStructureParId(id: number): Observable<Structure> {
    return this.http.get<Structure>(`${this.apiUrl}/${id}`);
  }

  obtenirToutesStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.apiUrl);
  }

  mettreAJourStructure(
    id: number,
    structure: Structure
  ): Observable<Structure> {
    return this.http.put<Structure>(
      `${this.apiUrl}/${id}`,
      structure,
      this.httpOptions
    );
  }

  supprimerStructure(id: number): Observable<void> {
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
