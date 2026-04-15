import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroList } from './components/hero-list/hero-list';
import { HeroInsert } from './components/hero-insert/hero-insert';

@Component({
  selector: 'app-root',
  imports: [HeroList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('progetto_secci');
}
