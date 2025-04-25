import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Propiedades } from '../app/models/Propiedades';
// Declara que esta clase puede ser inyectada como una dependencia
@Injectable({
  providedIn: 'root', //el servicio está disponible en toda la aplicación
})
export class PropiedadesService {
  // Define la URL base del servidor donde se encuentran los archivos PHP
  url = 'http://localhost/archivos_php_inmobiliaria/';
  // Constructor que inyecta una instancia de HttpClient en el servicio
  constructor(private http: HttpClient) {}
  recuperarTodos() {
    // Realiza una solicitud HTTP GET al endpoint 'recuperartodos.php'
    return this.http.get(`${this.url}recuperartodos.php`);
  }
  alta(propiedad: Propiedades) {
    // Realiza una solicitud HTTP POST al endpoint 'alta.php' enviando el

    return this.http.post(`${this.url}alta.php`, JSON.stringify(propiedad));
  }

  baja(propiedad: Propiedades) {
    return this.http.get(`${this.url}baja.php?codigo=${propiedad.id}`);
  }
  seleccionar(propiedad: Propiedades) {
    return this.http.get(`${this.url}/seleccionar.php?id=` + propiedad.id);
  }
  modificacion(propiedad: Propiedades) {
    return this.http.post(
      `${this.url}modificacion.php`,
      JSON.stringify(propiedad)
    );
  }
}
