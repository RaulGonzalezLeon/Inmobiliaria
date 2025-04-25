import { Component } from '@angular/core';
import { Propiedades } from '../../models/Propiedades';
import { PropiedadesService } from '../../propiedades.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  propiedades: any[] = [];
  busquedaNombre: string = '';
  propiedadBorrada: any;
  propiedad: Propiedades = new Propiedades(0, '', '', '', '', '', 0, 0, 0, 0, '');

  constructor(private propiedadesServicio: PropiedadesService) {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.propiedadesServicio.recuperarTodos().subscribe((respuesta: any) => {
      console.log(respuesta);
      this.propiedades = respuesta;
    });
  }

  // Getter que devuelve la lista de propiedades filtrada según el tipo de propiedad
  get propiedadesFiltradas() {
    if (!this.busquedaNombre) {
      return this.propiedades;
    }
    return this.propiedades.filter(propiedad =>
      propiedad.tipo_propiedad.toLowerCase().includes(this.busquedaNombre.toLowerCase())
    );
  }

  // trackBy para optimizar la renderización de la lista
  trackByPropiedadId(index: number, propiedad: any): number {
    return propiedad.id;
  }
}











