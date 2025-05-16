import { Component } from '@angular/core';
import { Propiedades } from '../../models/Propiedades';
import { PropiedadesService } from '../../propiedades.service';
import { TipoPropiedadService } from '../../tipo-propiedad.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetalleViviendaComponent } from '../detalle-vivienda/detalle-vivienda.component'; // Importa el componente de detalle

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, CommonModule, DetalleViviendaComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  propiedades: any[] = [];
  tiposPropiedad: any[] = [];
  busquedaNombre: string = '';
  propiedadBorrada: any;
  propiedadSeleccionada: Propiedades | null = null; // <-- NUEVO: Para el detalle
  propiedad: Propiedades = new Propiedades(0, '', '', '', '', '', 0, 0, 0, 0, '');

  constructor(
    private propiedadesServicio: PropiedadesService,
    private tipoPropiedadServicio: TipoPropiedadService
  ) {
    this.recuperarTodos();
    this.cargarTiposPropiedad();
  }

  recuperarTodos() {
    this.propiedadesServicio.recuperarTodos().subscribe((respuesta: any) => {
      this.propiedades = respuesta;
    });
  }

  cargarTiposPropiedad() {
    this.tipoPropiedadServicio.recuperarTodos().subscribe((respuesta: any) => {
      this.tiposPropiedad = respuesta;
    });
  }

  // Obtener el nombre del tipo de propiedad a partir del ID
  getNombreTipoPropiedad(id: number): string {
    const tipo = this.tiposPropiedad.find(t => t.id === id);
    return tipo ? tipo.nombre : 'Desconocido';
  }

  // Método para manejar el click sobre una tarjeta
  mostrarDetalles(propiedad: Propiedades) {
    this.propiedadSeleccionada = propiedad;
  }

  // Método para cerrar la vista detallada
  cerrarDetalles() {
    this.propiedadSeleccionada = null;
  }

  // Getter que devuelve la lista de propiedades filtrada
  get propiedadesFiltradas() {
    if (!this.busquedaNombre) {
      return this.propiedades;
    }
    return this.propiedades.filter(propiedad =>
      this.getNombreTipoPropiedad(propiedad.tipo_propiedad)
        .toLowerCase()
        .includes(this.busquedaNombre.toLowerCase())
    );
  }

  trackByPropiedadId(index: number, propiedad: any): number {
    return propiedad.id;
  }
}
