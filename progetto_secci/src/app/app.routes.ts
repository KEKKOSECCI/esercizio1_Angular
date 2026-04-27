import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { HeroList } from './components/hero-list/hero-list';
import { HeroInsert } from './components/hero-insert/hero-insert';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'list',component:HeroList},
    {path:'insert/:id',component:HeroInsert},

];
