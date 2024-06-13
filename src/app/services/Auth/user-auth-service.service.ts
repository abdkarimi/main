import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor() {}

  public setRole(role: string) {
    localStorage.setItem('roles', role);
  }

  public getRole(): string | null {
    return localStorage.getItem('roles');
  }


  public getToken(): string {
    const token = localStorage.getItem('jwtToken');
    return token ? token : '';
  }


  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }


  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!this.getRole() && !!this.getToken();
  }

}
