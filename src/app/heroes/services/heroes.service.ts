import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return  this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( e => of(undefined))
      )
  }

  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=5`);
  }


  // *Endpoints CRUD Heroes*

  addHero( hero: Hero ): Observable<Hero> {

    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
  }

  updateHero( hero: Hero ): Observable<Hero> {

    if (!hero.id) throw new Error('El id es necesario para actualizar un héroe');

    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);
  }

  deleteHero( id: string ): Observable<boolean> {
    
    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError( e => of(false)),
        map( res => true)
      )
  }
}
