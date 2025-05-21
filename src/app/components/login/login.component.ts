import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Usuario } from '../../models/Usuarios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  usuario: Usuario = {
    correo: '',
    contrasena: '',
    rol: '' // Este campo puede eliminarse si no se rellena desde el frontend
  };

  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.resetUI();

    // Validación rápida de campos vacíos
    if (!this.usuario.correo || !this.usuario.contrasena) {
      this.errorMessage = 'Por favor, introduce tu correo y contraseña.';
      return;
    }

    this.loading = true;

    this.authService.login(this.usuario).subscribe({
      next: () => {
        // Redirección ya está en el AuthService
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error?.error?.mensaje || 'Credenciales incorrectas o error de red.';
        console.error('Error al iniciar sesión:', error);
      }
    });
  }

  private resetUI(): void {
    this.errorMessage = '';
    this.loading = false;
  }
}
