import { Component, Output, EventEmitter, Input } from '@angular/core';
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
  // 1. Questa è la copia locale. 
  // NON ha @Input(), quindi è isolata dal padre.
  newHero: Hero = {
    id: 0,
    nome: '',
    potere: '',
    completata: false
  };
// Quando il padre passa un eroe, creiamo una copia slegata dal riferimento originale
  @Input() set heroToEdit(value: Hero) {
    if (value) {
      this.newHero = { ...value }; // Lo spread operator {...} crea la copia
    }
  }
  @Output() addHero = new EventEmitter<Hero>();

  submitHero() {
    if (this.newHero.nome && this.newHero.potere) {
      // 2. Inviamo i dati al padre solo ORA
      this.addHero.emit({ ...this.newHero });

      // 3. Resettiamo la copia locale per svuotare i campi
      this.newHero = { id: 0, nome: '', potere: '', completata: false };
    }
  }
}



