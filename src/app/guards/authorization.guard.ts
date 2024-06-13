import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/Auth/user-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private userAuthService: UserAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data['roles'] as string[]; // Assuming you pass roles as data in route configuration
    const userRole = this.userAuthService.getRole(); // Get the role of the logged-in user
    if (userRole === null || !requiredRoles.includes(userRole)) {
      // If user doesn't have a role or doesn't have the required role, navigate to login page
      return this.router.parseUrl('/authentication/login');
    }
    return true;
  }
}
