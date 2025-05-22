import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../usuarios.service';
import { Usuario } from '../../models/Usuarios';

@Component({
  selector: 'app-anadir-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anadir-usuario.component.html',
  styleUrl: './anadir-usuario.component.css'
})
export class AnadirUsuarioComponent {
  usuario: Usuario = {
    correo: '',
    rol: 'user',
    contrasena: ''
  };

  mensaje: string = '';

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  anadirUsuario(): void {
    if (this.usuario.correo && this.usuario.rol && this.usuario.contrasena) {
      this.usuariosService.alta(this.usuario).subscribe({
        next: () => {
          this.mensaje = 'Usuario añadido correctamente. Redirigiendo al login...';
          // Limpia los datos del formulario
          this.usuario = { correo: '', rol: 'usuario', contrasena: '' };
          // Redirige después de mostrar mensaje
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: () => {
          this.mensaje = 'Error al añadir el usuario.';
        }
      });
    } else {
      this.mensaje = 'Por favor, completa todos los campos.';
    }
  }
}
