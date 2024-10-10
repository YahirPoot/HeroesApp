
import { Injectable } from '@angular/core';

import { CanActivateFn, CanMatchFn, CanActivate, CanMatch, Router, GuardResult, MaybeAsync, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => console.log('isAuthenticated', isAuthenticated)),
        tap( isAuthenticated => {
          if ( !isAuthenticated ) {
            this.router.navigate(['./auth/login'])
          }
        }),
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> {
    return this.checkAuthStatus();
  }

}
