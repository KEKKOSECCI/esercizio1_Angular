import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaccia per tipizzare l'eroe
export interface Hero {
  id: number;
  nome: string;
  potere: string;
  completata: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // L'URL della tua API reale
  private apiUrl = 'https://crudcrud.com/apid9316f9bf8d446b48fe3d35b6ebf334e'; 

  constructor(private http: HttpClient) {}

  // 1. Restituisce tutta la lista (Richiesta GET)
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  // 2. Cerca un eroe specifico per l'Edit (Richiesta GET)
  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

  // 3. Segna missione come fatta (Richiesta PUT o PATCH)
  // Nota: Crudcrud richiede l'invio dell'intero oggetto aggiornato con PUT
  markAsDone(hero: Hero): Observable<void> {
    const updatedHero = { ...hero, completata: true };
    return this.http.put<void>(`${this.apiUrl}/${hero.id}`, updatedHero);
  }

  // 4. Calcola il totale delle missioni completate (Gestito lato client)
  // Questo metodo elabora l'array che riceve dall'Observable del componente
  getTotalCompleted(heroes: Hero[]): number {
    return heroes.filter(h => h.completata).length;
  }

  // 5. Gestisce sia AGGIUNTA che MODIFICA
  saveHero(hero: Hero): Observable<Hero | void> {
    const heroId = Number(hero.id);

    if (heroId !== 0) {
      // MODIFICA: Richiesta PUT all'URL dell'eroe specifico
      return this.http.put<void>(`${this.apiUrl}/${heroId}`, hero);
    } else {
      // AGGIUNTA: Richiesta POST alla collezione generica
      // Rimuoviamo l'ID a 0 prima di inviarlo, poiché il server ne genererà uno unico
      const { id, ...newHero } = hero; 
      return this.http.post<Hero>(this.apiUrl, newHero);
    }
  }
}
