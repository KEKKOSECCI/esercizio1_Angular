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
  // Oggetto d'appoggio per il two-way binding
  @Input() newHero: Hero = {
    id: 0,
    nome: '',
    potere: '',
    completata: false
  };

  @Output() addHero = new EventEmitter<Hero>();
 

  submitHero() {
  if (this.newHero.nome && this.newHero.potere) {
    // Mandiamo l'oggetto così com'è (l'ID lo gestisce il padre o rimane quello di prima)
    this.addHero.emit({ ...this.newHero });

    // Resettiamo il form riportandolo allo stato "vuoto" (ID 0)
    this.newHero = { id: 0, nome: '', potere: '', completata: false };
  }
}

}
