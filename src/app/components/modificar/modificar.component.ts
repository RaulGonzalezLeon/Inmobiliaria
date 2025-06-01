import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropiedadesService } from '../../propiedades.service';
import { Propiedades } from '../../models/Propiedades';

@Component({
  selector: 'app-modificar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
})
export class ModificarComponent {
  propiedades: any;
  tiposPropiedad: any[] = [];
  prop: Propiedades = {
    id: 0,
    titulo: '',
    tipo_propiedad: '',
    descripcion: '',
    direccion: '',
    ciudad: '',
    precio: 0,
    habitaciones: 0,
    banos: 0,
    superficie: 0,
    imagen: ''
  };

  mostrarMensajeExito: boolean = false;
  mostrarErrorPrecio: boolean = false;

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

  modificacion() {
    if (this.prop.precio < 50000) {
      this.mostrarErrorPrecio = true;
      this.mostrarMensajeExito = false;
      return;
    }

    this.propiedadesServicio.modificacion(this.prop).subscribe((datos: any) => {
      if (datos['resultado'] === 'OK') {
        this.mostrarMensajeExito = true;
        this.mostrarErrorPrecio = false;
        this.recuperarTodos();

        setTimeout(() => {
          this.mostrarMensajeExito = false;
        }, 3000);
      }
    });
  }

  seleccionar(propiedad: Propiedades) {
    this.propiedadesServicio.seleccionar(propiedad)
      .subscribe((result: any) => (this.prop = result[0]));
  }

  obtenerNombreTipo(id: number | string): string {
    const tipo = this.tiposPropiedad.find(t => t.id == id);
    return tipo ? tipo.nombre : 'Desconocido';
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
