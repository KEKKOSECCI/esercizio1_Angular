import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from '../hero-card-component/hero-card-component';
import { Hero } from '../../models/hero-model';
import { HeroInsert } from '../hero-insert/hero-insert';
@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HeroCardComponent,HeroInsert], // Importa il figlio qui!
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})
export class HeroList {
  currentHero !: Hero ;
  heroes: Hero[] = [
    {id: 1, nome: "Iron-Man", potere: "fico", completata: false},
    {id: 2, nome: "Spider-Man", potere: "ragno", completata: false},
    {id: 3, nome: "Hulk", potere: "super-forza", completata: false}
  ];

  // Funzione per segnare la missione come fatta
  markAsDone(heroId: number) {
    const hero = this.heroes.find(h => h.id === heroId);
    if (hero) {
      hero.completata = true;
    }
  }

  // Getter per calcolare il totale delle missioni completate
  get totalCompleted() {
    return this.heroes.filter(h => h.completata).length;
  }
  addNewHero(hero: Hero) {
    this.heroes.push(hero);
  }
  modifyHero(heroId: Hero) {
    this.currentHero = heroId;
  }
  getcurrentHero(){
      return this.currentHero;
  }

}

