import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Hero } from '../models/hero-model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private apiUrl = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) {}

  // GET ALL
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  // GET BY ID
  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

  // PUT (mark as done)
  markAsDone(hero: Hero): Observable<void> {
    const updatedHero = { ...hero, completata: true };

    const { id, ...cleanHero } = updatedHero;

    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      { id, ...cleanHero }
    );
  }

  // DELETE
  delete(id: string): Observable<Hero[]> {
    if (!id) {
      throw new Error("ID mancante nella delete()");
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      switchMap(() => this.getHeroes())
    );
  }

  // POST / PUT SAVE
  saveHero(hero: Hero): Observable<any> {

    // 🔵 UPDATE (PUT)
    if (hero.id && hero.id.trim() !== '') {

      const { id, ...cleanHero } = hero;

      return this.http.put<void>(
        `${this.apiUrl}/${id}`,
        { id, ...cleanHero }
      );
    }

    // 🟢 CREATE (POST)
    const { id, ...cleanHero } = hero;

    return this.http.post<Hero>(this.apiUrl, cleanHero).pipe(
      switchMap(() => this.getHeroes()),
      tap((lista) => {
        console.log('--- LISTA AGGIORNATA ---');
        console.table(lista);
      })
    );
  }

  // BUSINESS LOGIC
  getTotalCompleted(heroes: Hero[]): number {
    return heroes.filter(h => h.completata).length;
  }
}