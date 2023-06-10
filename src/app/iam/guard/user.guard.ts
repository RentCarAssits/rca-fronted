import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.authService.getToken();
    const requiresAuth = route.data['requiresAuth'];

    if (requiresAuth === false) {
      return !isAuthenticated;
    } else {
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['public/landing']);
        return false;
      }
    }
  }
}


