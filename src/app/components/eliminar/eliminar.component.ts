import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropiedadesService } from '../../propiedades.service';
import { Propiedades } from '../../models/Propiedades';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css'],
})
export class EliminarComponent {
  propiedades: any;
  tiposPropiedad: any[] = [];
  mensajeBorrado: string = '';

  constructor(private propiedadesServicio: PropiedadesService) {
    this.recuperarTodos();
    this.recuperarTipos();
  }

  recuperarTodos() {
    this.propiedadesServicio.recuperarTodos().subscribe((respuesta: any) => {
      this.propiedades = respuesta;
    });
  }

  recuperarTipos() {
    this.propiedadesServicio.getTiposPropiedad().subscribe((data: any) => {
      this.tiposPropiedad = data;
    });
  }

  baja(propiedad: Propiedades) {
    this.propiedadesServicio.baja(propiedad).subscribe((datos: any) => {
      if (datos['resultado'] === 'OK') {
        this.mensajeBorrado = 'Se ha eliminado correctamente.';
        this.recuperarTodos();
        setTimeout(() => this.mensajeBorrado = '', 3000); // Oculta el mensaje tras 3s
      } else {
        this.mensajeBorrado = 'Error al eliminar la vivienda.';
      }
    });
  }

  obtenerNombreTipo(id: number | string): string {
    const tipo = this.tiposPropiedad.find(t => t.id == id);
    return tipo ? tipo.nombre : 'Desconocido';
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
