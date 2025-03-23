import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,          // <--- Standalone
  imports: [CommonModule, FormsModule], // <--- se importan módulos necesarios
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  client_id: string = '';
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.username, this.password, this.client_id).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.successMsg = 'Usuario creado correctamente';
        // Redirigir al login
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en register:', error);
        this.errorMsg = error.error?.error || 'Error al registrar';
        // Manejar error
      }
    });
  }
}