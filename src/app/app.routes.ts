import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuComponent,
    children: [/* Aca van las rutas que van a tener que poner la ruta a su componente para que la ruta sea menu/ejemplo
      {
        path: 'ejemplo',
        loadComponent: () => import('./components/ejemplo/ejemplo.component').then(m => m.EjemploComponent)
      },
      */
      {
        path: 'reporte-issue',
        loadComponent: () => import('./components/new-issue/new-issue.component').then(m => m.NewIssueComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
