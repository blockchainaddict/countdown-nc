import { Routes } from '@angular/router'
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'home', component: AppComponent }, 
  { path: 'countdown', loadComponent: () => import('./countdown/countdown.component').then(m => m.CountdownComponent) },
];