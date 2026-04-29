import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from '../hero-card-component/hero-card-component';
import { Hero } from '../../models/hero-model';
import { RouterLink } from '@angular/router';
import { HeroService } from '../../services/heroservice';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HeroCardComponent, RouterLink],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})
export class HeroList implements OnInit {
  heroes: Hero[] = [];
  currentHero!: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.caricaEroi();
  }

  // 1. Metodo per caricare i dati via HTTP
  caricaEroi() {
    this.heroService.getHeroes().subscribe({
      next: (data) => {
        this.heroes = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento degli eroi:', err);
      }
    });
  }

   // 2. Funzione per segnare la missione come fatta
  markAsDone(id: number) { // 👈 Cambia il tipo del parametro in 'number'
    
    // Cerchiamo l'oggetto eroe nell'array locale usando l'ID ricevuto dal figlio
    const hero = this.heroes.find(h => h.id === id);

    if (hero) {
      this.heroService.markAsDone(hero).subscribe({
        next: () => {
          // Aggiorna lo stato visivo dell'eroe senza ricaricare tutto
          hero.completata = true;
        },
        error: (err) => {
          console.error('Errore nel completamento della missione:', err);
        }
      });
    }
  }


  // 3. Getter calcolato passando l'array locale
  get totalCompleted() {
    return this.heroService.getTotalCompleted(this.heroes);
  }
}
