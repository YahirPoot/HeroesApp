import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})

export class AuthService {

  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if ( !this.user ) return undefined;

    //* El structuredClone es una función que clona un objeto de manera profunda
    return structuredClone(this.user);
  }

  login( email: string, password: string ): Observable<User> {

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap( user => localStorage.setItem('token', user.id.toString()))
      );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
