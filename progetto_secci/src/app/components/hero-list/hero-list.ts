import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 1. Importa questo
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

  // 2. Iniettalo nel costruttore
  constructor(
    private heroService: HeroService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.caricaEroi();
  }

  caricaEroi() {
    this.heroService.getHeroes().subscribe({
      next: (data) => {
        console.log('Eroi caricati:', data);
        this.heroes = data; // I dati vengono salvati...
        
        // 3. 🔥 Forza Angular a ricalcolare la vista!
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Errore nel caricamento degli eroi:', err);
      }
    });
  }

  markAsDone(id: string) {
    const hero = this.heroes.find(h => h.id === id);

    if (hero) {
      this.heroService.markAsDone(hero).subscribe({
        next: () => {
          hero.completata = true;
          this.cdr.detectChanges(); // 👈 Consigliato anche qui dopo la modifica
        },
        error: (err) => console.error('Errore:', err)
      });
    }
  }
 cancellaEroe(id: string) {
  this.heroService.delete(id).subscribe({
    next: (listaAggiornata) => {
      this.heroes = listaAggiornata; // Aggiorna l'array con la nuova lista senza l'eroe
      this.cdr.detectChanges(); // Forza il refresh grafico
    },
    error: (err) => console.error('Errore nella cancellazione:', err)
  });
}

  get totalCompleted() {
    return this.heroService.getTotalCompleted(this.heroes);
  }
}
