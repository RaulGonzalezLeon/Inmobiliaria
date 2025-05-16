import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../app/models/Usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  // Cambia la URL según la ruta real de tus scripts PHP
  url = 'http://localhost/archivos_php_usuarios/';

  constructor(private http: HttpClient) {}

  recuperarTodos() {
    return this.http.get(`${this.url}recuperatodos.php`);
  }

  alta(usuario: Usuario) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(usuario));
  }

  baja(usuario: Usuario) {
    return this.http.get(`${this.url}baja.php?correo=${encodeURIComponent(usuario.correo)}`);
  }

  seleccionar(usuario: Usuario) {
    return this.http.get(`${this.url}seleccionar.php?correo=${encodeURIComponent(usuario.correo)}`);
  }

  modificacion(usuario: Usuario) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(usuario));
  }

  login(usuario: Usuario) {
    return this.http.post(`${this.url}login.php`, JSON.stringify({
      correo: usuario.correo,
      contrasena: usuario.contrasena
    }));
  }
}
