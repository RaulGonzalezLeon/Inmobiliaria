import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Usuario } from '../../models/Usuarios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  usuario: Usuario = { correo: '', contrasena: '', rol: '' };
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';  // Limpiar cualquier mensaje de error
    this.loading = true;      // Mostrar estado de carga

    this.authService.login(this.usuario).subscribe(
      (response) => {
        this.loading = false;  // Desactivar el estado de carga

        // El servicio ya maneja la redirección, no es necesario hacer nada aquí
      },
      (error) => {
        this.loading = false;  // Desactivar el estado de carga
        this.errorMessage = 'Ocurrió un error al intentar iniciar sesión. Intenta de nuevo.';
        console.error('Error en login:', error);
      }
    );
  }
}
