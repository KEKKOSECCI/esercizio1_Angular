import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Hero } from '../../models/hero-model'; // 👈 Assicurati che punti al modello con _id
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
  // 1. Risoluzione Errore 1: Rimuoviamo 'id: "0"' e usiamo l'interfaccia basata su _id
  hero: Hero = { nome: '', potere: '', completata: false };

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 2. Risoluzione Errore 2: Rimuoviamo il "+" per non forzare la stringa a numero
    const id = this.route.snapshot.paramMap.get('id')!;
    
    // Controlliamo che l'id esista e non sia la stringa "0" (usata per i nuovi inserimenti)
    if (id && id !== '0') {
      this.heroService.getHeroById(id).subscribe({
        next: (data) => {
          if (data) {
            this.hero = { ...data }; // Copia l'eroe nel form (includerà il suo _id)
          }
        },
        error: (err) => {
          console.error('Errore nel recupero dell\'eroe:', err);
        }
      });
    }
  }

  save() {
    this.heroService.saveHero(this.hero).subscribe({
      next: () => {
        console.log('Eroe salvato con successo!');
        this.router.navigate(['/list']); 
      },
      error: (err) => {
        console.error('Errore durante il salvataggio:', err);
      }
    });
  }
}
