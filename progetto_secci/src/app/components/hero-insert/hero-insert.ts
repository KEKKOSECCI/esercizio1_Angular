import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // OBBLIGATORIO per ngModel
import { Hero } from '../../models/hero-model';

@Component({
  selector: 'app-hero-insert',
  standalone: true,
  imports: [FormsModule], // Aggiungilo qui
  templateUrl: './hero-insert.html',
  styleUrl: './hero-insert.css'
})
export class HeroInsert {
  // Oggetto d'appoggio per il two-way binding
  newHero: Hero = {
    id: 0,
    nome: '',
    potere: '',
    completata: false
  };

  @Output() addHero = new EventEmitter<Hero>();

  submitHero() {
    if (this.newHero.nome && this.newHero.potere) {
      // Mandiamo una copia dell'oggetto al padre
      this.addHero.emit({ ...this.newHero, id: Date.now() });
      
      // Resettiamo il form
      this.newHero.nome = '';
      this.newHero.potere = '';
    }
  }
}
