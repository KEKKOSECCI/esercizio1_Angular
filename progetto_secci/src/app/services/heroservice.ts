import { Injectable } from '@angular/core';

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
  // Database locale degli eroi
  private heroes: Hero[] = [
    { id: 1, nome: "Iron-Man", potere: "fico", completata: false },
    { id: 2, nome: "Spider-Man", potere: "ragno", completata: false },
    { id: 3, nome: "Hulk", potere: "super-forza", completata: false },
    { id: 4, nome: "Corsaro", potere: "Logistica", completata: false }
  ];

  // Restituisce tutta la lista
  getHeroes(): Hero[] {
    return this.heroes;
  }

  // Cerca un eroe specifico per l'Edit
  getHeroById(id: number): Hero | undefined {
    return this.heroes.find(h => h.id === id);
  }

  // Segna missione come fatta
  markAsDone(heroId: number) {
    const hero = this.heroes.find(h => h.id === heroId);
    if (hero) {
      hero.completata = true;
    }
  }

  // Calcola il totale delle missioni completate
  getTotalCompleted(): number {
    return this.heroes.filter(h => h.completata).length;
  }

  // Gestisce sia AGGIUNTA che MODIFICA
  saveHero(hero: Hero) {
    const heroId = Number(hero.id);
    const index = this.heroes.findIndex(h => h.id === heroId);

    if (index !== -1) {
      // MODIFICA: Sovrascrive l'eroe esistente
      this.heroes[index] = { ...hero, id: heroId };
    } else {
      // AGGIUNTA: Genera nuovo ID se è 0, altrimenti usa quello passato
      const finalId = heroId === 0 ? this.generateNewId() : heroId;
      this.heroes.push({ ...hero, id: finalId });
    }
  }

  // Utility per generare un ID unico (evita duplicati)
  private generateNewId(): number {
    return this.heroes.length > 0 
      ? Math.max(...this.heroes.map(h => h.id)) + 1 
      : 1;
  }
}