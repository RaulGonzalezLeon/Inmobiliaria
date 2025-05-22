import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../app/models/Contacto'; // Asegúrate de tener esta interfaz

@Injectable({
  providedIn: 'root',
})
export class ContactosService {
  // Cambia esta URL si tus scripts están en otro directorio
  url = 'http://localhost/archivos_php_contacto/';

  constructor(private http: HttpClient) {}

  recuperarTodos() {
    return this.http.get(`${this.url}recuperatodos.php`);
  }

  alta(contacto: Contacto) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(contacto));
  }

  baja(contacto: Contacto) {
    return this.http.get(`${this.url}baja.php?id=${encodeURIComponent(contacto.id)}`);
  }

  seleccionar(contacto: Contacto) {
    return this.http.get(`${this.url}seleccionar.php?id=${encodeURIComponent(contacto.id)}`);
  }

  modificacion(contacto: Contacto) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(contacto));
  }
}
