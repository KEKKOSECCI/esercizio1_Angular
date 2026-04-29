import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Hero } from '../../models/hero-model';
import { HeroService } from '../../services/heroservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero-insert',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './hero-insert.html',
  styleUrl: './hero-insert.css'
})
export class HeroInsert implements OnInit {
  hero: Hero = { id: 0, nome: '', potere: '', completata: false };

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    if (id !== 0) {
      this.heroService.getHeroById(id).subscribe({
        next: (data) => {
          if (data) {
            this.hero = { ...data }; // Copia l'eroe nel form
          }
        },
        error: (err) => {
          console.error('Errore nel recupero dell\'eroe:', err);
        }
      });
    }
  }

  save() {
    // Ci iscriviamo all'Observable restituito da saveHero
    this.heroService.saveHero(this.hero).subscribe({
      next: () => {
        console.log('Eroe salvato con successo!');
        // Naviga indietro solo DOPO che il server ha risposto positivamente
        this.router.navigate(['/list']); 
      },
      error: (err) => {
        console.error('Errore durante il salvataggio:', err);
      }
    });
  }
}
