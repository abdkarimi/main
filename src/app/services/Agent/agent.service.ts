import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Utilisateur } from 'src/app/models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = `${environment.baseUrl}/AULSH/utilisateurs`;


  constructor(private http: HttpClient) { }

  // Method to get all UtilisateurDto objects
  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/all`);
  }
  saveUtilisateur(utilisateur: Utilisateur, file: File): Observable<Utilisateur> {
    const formData = new FormData();
    formData.append('utilisateur', JSON.stringify(utilisateur));
    formData.append('file', file);

    return this.http.post<Utilisateur>(`${this.apiUrl}/save`, formData);
  }

  updateUtilisateur(utilisateur: Utilisateur, file?: File): Observable<Utilisateur> {
    const formData = new FormData();
    formData.append('utilisateur', JSON.stringify(utilisateur));
    if (file) {
      formData.append('file', file);
    }

    return this.http.post<Utilisateur>(`${this.apiUrl}/update`, formData);
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/byId/${id}`);
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
