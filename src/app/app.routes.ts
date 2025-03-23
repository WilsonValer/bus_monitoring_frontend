// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { MapComponent } from '../components/map/map.component';
import { AuthGuard } from '../guards/auth.guard';
import { MainLayoutComponent } from '../components/main-layout/main-layout.component';



export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: MapComponent },
      // Podrías tener 'paraderos', etc.
    ]
  }
];
