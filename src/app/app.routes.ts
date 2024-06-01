import { Routes } from '@angular/router'
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./countdown/countdown.component').then(m => m.CountdownComponent) },
  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
];