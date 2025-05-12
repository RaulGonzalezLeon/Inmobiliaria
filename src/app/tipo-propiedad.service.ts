import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoPropiedad } from '../app/models/Tipo_propiedad';

@Injectable({
  providedIn: 'root',
})
export class TipoPropiedadService {
  // URL base de los scripts PHP específicos de tipo_propiedad
  url = 'http://localhost/archivos_php_tipo_propiedad/';

  constructor(private http: HttpClient) {}

  recuperarTodos() {
    return this.http.get(`${this.url}recuperartodos.php`);
  }

  alta(tipo: TipoPropiedad) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(tipo));
  }

  baja(tipo: TipoPropiedad) {
    return this.http.get(`${this.url}baja.php?codigo=${tipo.id}`);
  }

  seleccionar(tipo: TipoPropiedad) {
    return this.http.get(`${this.url}seleccionar.php?id=${tipo.id}`);
  }

  modificacion(tipo: TipoPropiedad) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(tipo));
  }
}
