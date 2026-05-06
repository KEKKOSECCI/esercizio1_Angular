import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 Aggiunto ChangeDetectorRef
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
  hero: Hero = { id: '0', nome: '', potere: '', completata: false };

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef // 👈 Iniettato qui
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id && id !== '0') {
      this.heroService.getHeroById(id!).subscribe({
        next: (data) => {
          if (data) {
            // Cloniamo l'oggetto e forziamo il refresh della UI
            this.hero = { ...data }; 
            this.cdr.detectChanges(); // 🔥 Fondamentale per vedere i dati subito
          }
        },
        error: (err) => console.error('Errore nel recupero:', err)
      });
    }
  }

  save() {
    this.heroService.saveHero(this.hero).subscribe({
      next: () => {
        console.log('Salvataggio completato');
        this.router.navigate(['/list']);
      },
      error: (err) => console.error('Errore durante il salvataggio:', err)
    });
  }
}
