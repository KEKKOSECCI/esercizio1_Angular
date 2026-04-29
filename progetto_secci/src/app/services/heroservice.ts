import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Hero } from '../models/hero-model'; // 👈 IMPORTA QUELLA DEL MODELLO

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private apiUrl = 'https://crudcrud.com/api/5cb0c3222d15483082cf26cccf49725e'; 

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    // Non serve più il .pipe(map(...)) perché usiamo direttamente _id
    return this.http.get<Hero[]>(`${this.apiUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/heroes/${id}`);
  }

    markAsDone(hero: Hero): Observable<void> {
    // 1. Creiamo l'oggetto aggiornato con completata = true
    const updatedHero = { ...hero, completata: true };
    
    // 2. 🔥 ESTRAIAMO l' _id dall'oggetto da spedire!
    const { _id, ...cleanHero } = updatedHero; 

    // Mandiamo a crudcrud l'URL con l'ID, ma il body pulito senza _id
    return this.http.put<void>(`${this.apiUrl}/heroes/${_id}`, cleanHero);
  }

   delete(id: string): Observable<Hero[]> {
    // 1. Invia solo l'URL senza passare alcun oggetto come secondo parametro
    return this.http.delete<void>(`${this.apiUrl}/heroes/${id}`).pipe(
      
      // 2. Dopo la cancellazione, richiedi la lista aggiornata
      switchMap(() => this.getHeroes()),
      tap((listaEroi) => {
        console.log('--- LISTA AGGIORNATA DOPO LA DELETE ---');
        console.table(listaEroi);
      })
    );
  }


  getTotalCompleted(heroes: Hero[]): number {
    return heroes.filter(h => h.completata).length;
  }

    saveHero(hero: Hero): Observable<any> {
    // 1. Se l'eroe ha già un _id di crudcrud, allora è una modifica (PUT)
    if (hero._id && hero._id.trim() !== '') {
      
      // 👉 ESTRAIAMO l' _id dall'oggetto da spedire!
      const { _id, ...cleanHero } = hero; 
      
      // Mandiamo a crudcrud l'URL con l'ID, ma il body pulito senza _id
      return this.http.put<void>(`${this.apiUrl}/heroes/${_id}`, cleanHero);
      
    } else {
      // 2. È un'aggiunta (POST)
      const { _id, ...cleanHero } = hero; 
      
      return this.http.post<Hero>(`${this.apiUrl}/heroes`, cleanHero).pipe(
        switchMap(() => this.getHeroes()),
        tap((listaEroi) => {
          console.log('--- LISTA AGGIORNATA DOPO LA POST ---');
          console.table(listaEroi);
        })
      );
    }
  }


}
