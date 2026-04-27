import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from '../hero-card-component/hero-card-component';
import { Hero } from '../../models/hero-model';
import { RouterLink } from '@angular/router';
import { HeroService } from '../../services/heroservice';
@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HeroCardComponent,RouterLink], // Importa il figlio qui!
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})
export class HeroList {
  heroes: Hero[] = [];

  // 1. L'istanza si crea nel costruttore
  constructor(private heroService: HeroService) {}
  currentHero !: Hero ;
  ngOnInit() {
    // 2. Usi l'istanza per caricare i dati
    this.heroes = this.heroService.getHeroes();
  }
  // Funzione per segnare la missione come fatta
  markAsDone(id: number) {
    this.heroService.markAsDone(id);
  }
  get totalCompleted() {
    return this.heroService.getTotalCompleted();
  }

  
}

