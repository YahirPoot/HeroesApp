import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => console.log('is authenticated', isAuthenticated)),
        tap(
          isAuthenticated => {
            if ( isAuthenticated) {
              this.route.navigate(['./']);
            }
          }
        ),
        map( isAuthenticated => !isAuthenticated),
      )
  }

  // El canActivate se ejecuta cuando se intenta acceder a una ruta de manera directa (por ejemplo, escribiendo la ruta en la barra de direcciones)
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  // El canMatch se ejecuta cuando se intenta acceder a una ruta de manera indirecta (por ejemplo, a través de un enlace)
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

}
