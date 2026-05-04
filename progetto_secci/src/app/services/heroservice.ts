import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Hero } from '../models/hero-model'; // 👈 IMPORTA QUELLA DEL MODELLO

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private apiUrl = 'https://crudcrud.com/api/ea779bbde0974df887aeaf9c0800cdd9/heroes'; 

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    // Non serve più il .pipe(map(...)) perché usiamo direttamente _id
    return this.http.get<Hero[]>(`${this.apiUrl}`);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

    markAsDone(hero: Hero): Observable<void> {
    const updatedHero = { ...hero, completata: true };
    const { _id, ...cleanHero } = updatedHero; 
    return this.http.put<void>(`${this.apiUrl}/${_id}`, cleanHero);
  }

   delete(id: string): Observable<Hero[]> {
  if (!id) {
    throw new Error("ID mancante nella delete()");
  }

  return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
    switchMap(() => this.getHeroes())
  );
}


  getTotalCompleted(heroes: Hero[]): number {
    return heroes.filter(h => h.completata).length;
  }

    saveHero(hero: Hero): Observable<any> {
    if (hero._id && hero._id.trim() !== '0') {
      
      // 👉 ESTRAIAMO l' _id dall'oggetto da spedire!
      const { _id, ...cleanHero } = hero; 
      
      // Mandiamo a crudcrud l'URL con l'ID, ma il body pulito senza _id
      return this.http.put<void>(`${this.apiUrl}/${_id}`, cleanHero);
      
    } else {
      // 2. È un'aggiunta (POST)
      const { _id, ...cleanHero } = hero; 
      
      return this.http.post<Hero>(`${this.apiUrl}`, cleanHero).pipe(
        switchMap(() => this.getHeroes()),
        tap((listaEroi) => {
          console.log('--- LISTA AGGIORNATA DOPO LA POST ---');
          console.table(listaEroi);
        })
      );
    }
  }


}
