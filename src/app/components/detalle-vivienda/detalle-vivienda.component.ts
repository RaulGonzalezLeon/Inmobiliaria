import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TipoPropiedadService } from '../../tipo-propiedad.service';

@Component({
  selector: 'app-detalle-vivienda',
  templateUrl: './detalle-vivienda.component.html',
  styleUrls: ['./detalle-vivienda.component.css']
})
export class DetalleViviendaComponent {
  @Input() propiedad: any;
  @Output() cerrar = new EventEmitter<void>();

  tiposPropiedad: any[] = [];

  constructor(private tipoPropiedadService: TipoPropiedadService) {
    this.cargarTiposPropiedad();
  }

  cargarTiposPropiedad() {
    this.tipoPropiedadService.recuperarTodos().subscribe((respuesta: any) => {
      this.tiposPropiedad = respuesta;
    });
  }

  getNombreTipoPropiedad(id: number): string {
    const tipo = this.tiposPropiedad.find(t => t.id === id);
    return tipo ? tipo.nombre : 'Desconocido';
  }

  cerrarDetalle() {
    this.cerrar.emit();
  }
}
