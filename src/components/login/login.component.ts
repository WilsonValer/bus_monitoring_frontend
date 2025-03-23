// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,          // <--- Standalone
  imports: [CommonModule, FormsModule, RouterModule ], // <--- se importan módulos necesarios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Guardar token y user info
        this.authService.setToken(response.token);
        this.authService.setUser(response.user);
        // Navegar a la pantalla principal (map, por ejemplo)
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.errorMsg = error.error?.error || 'Error al iniciar sesión';
        // Manejar error (mostrar mensaje en la UI)
      }
    });
  }
}

