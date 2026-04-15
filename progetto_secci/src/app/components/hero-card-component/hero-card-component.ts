import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Hero } from '../../models/hero-model';

@Component({
  selector: 'app-hero-card-component',
  imports: [CommonModule],
  templateUrl: './hero-card-component.html',
  styleUrl: './hero-card-component.css',
})
export class HeroCardComponent {
  @Input() hero!: Hero; // Riceve l'eroe dal padre
  @Output() onMissionDone = new EventEmitter<number>(); // Invia l'ID al padre
  notifyParent() {
    this.onMissionDone.emit(this.hero.id);
  }

}
