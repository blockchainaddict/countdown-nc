import { Routes } from '@angular/router'
import { CountdownComponent } from './countdown/countdown.component';

export const routes: Routes = [
  { path: '', component: CountdownComponent }, 
  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
];
