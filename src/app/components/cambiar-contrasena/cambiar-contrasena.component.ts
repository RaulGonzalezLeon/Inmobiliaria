import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../usuarios.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/Usuarios';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css'],
})
export class CambiarContrasenaComponent {
  form: FormGroup;
  mensaje: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  cambiarContrasena() {
    this.mensaje = '';
    this.error = '';

    if (this.form.invalid) {
      this.error = 'Por favor rellena correctamente todos los campos.';
      return;
    }

    const { correo, nuevaContrasena } = this.form.value;

    this.usuariosService.recuperarTodos().subscribe((usuarios: Usuario[]) => {
      const usuario = usuarios.find((u) => u.correo === correo);

      if (!usuario) {
        this.error = 'Correo no encontrado.';
        return;
      }

      const usuarioActualizado = { ...usuario, contrasena: nuevaContrasena };

      this.usuariosService.modificacion(usuarioActualizado).subscribe({
        next: () => {
          this.mensaje = 'Contraseña actualizada correctamente.';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.error = 'Error al actualizar la contraseña.';
          console.error(err);
        },
      });
    });
  }
}
