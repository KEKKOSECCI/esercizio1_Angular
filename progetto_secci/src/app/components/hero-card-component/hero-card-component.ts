import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Hero } from '../../models/hero-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-card-component',
  imports: [CommonModule,RouterLink],
  templateUrl: './hero-card-component.html',
  styleUrl: './hero-card-component.css',
})
export class HeroCardComponent {
  @Input() hero!: Hero; 
  @Output() onMissionDone = new EventEmitter<string>(); 
  @Output() onDelete  = new EventEmitter<string>(); 

  notifyParent() {
    // Emettiamo la proprietà corretta del server
    this.onMissionDone.emit(this.hero._id);
  }
  avvisaDelete() {
    // Emettiamo la proprietà corretta del server
    this.onDelete.emit(this.hero._id);
  }
}

