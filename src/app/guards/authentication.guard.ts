import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/Auth/user-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private userAuthService: UserAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.userAuthService.isLoggedIn(); // Check if the user is logged in
    if (isLoggedIn === null) {
      // Handle case where user role or token is not available
      // For example, redirect to login page
      return this.router.parseUrl('/authentication/login'); // Return a UrlTree object to navigate
    }
    return isLoggedIn === true; // Return true if logged in, false otherwise
  }
}
