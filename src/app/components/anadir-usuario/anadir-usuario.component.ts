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
    // Comprobar si el correo ya está registrado
    this.usuariosService.seleccionar({ correo: this.usuario.correo, rol: '', contrasena: '' })
      .subscribe({
        next: (respuesta: any) => {
          if (respuesta && Object.keys(respuesta).length > 0) {
            this.mensaje = 'Ya existe un usuario con ese correo.';
          } else {
            // No existe → crearlo
            this.usuariosService.alta(this.usuario).subscribe({
              next: () => {
                this.mensaje = 'Usuario añadido correctamente. Redirigiendo al login...';
                this.usuario = { correo: '', rol: 'user', contrasena: '' };
                setTimeout(() => this.router.navigate(['/login']), 1500);
              },
              error: () => {
                this.mensaje = 'Error al añadir el usuario.';
              }
            });
          }
        },
        error: () => {
          this.mensaje = 'Error al comprobar el correo.';
        }
      });
  } else {
    this.mensaje = 'Por favor, completa todos los campos.';
  }
}
}
