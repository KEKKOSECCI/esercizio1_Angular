import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // OBBLIGATORIO per ngModel
import { Hero } from '../../models/hero-model';
import { HeroService } from '../../services/heroservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero-insert',
  standalone: true,
  imports: [FormsModule], // Aggiungilo qui
  templateUrl: './hero-insert.html',
  styleUrl: './hero-insert.css'
})
export class HeroInsert {
  hero: Hero = { id: 0, nome: '', potere: '', completata: false };

  // Inietti il servizio, le rotte (per l'ID) e il router (per tornare indietro)
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id !== 0) {
      const data = this.heroService.getHeroById(id);
      if (data) this.hero = { ...data }; // Copia l'eroe nel form
    }
  }

  save() {
    this.heroService.saveHero(this.hero);
    this.router.navigate(['/list']); // Dopo il salva, torna alla lista
  }
}



