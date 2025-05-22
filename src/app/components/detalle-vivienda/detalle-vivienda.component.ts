import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TipoPropiedadService } from '../../tipo-propiedad.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service'; // <-- Importa AuthService

@Component({
  selector: 'app-detalle-vivienda',
  templateUrl: './detalle-vivienda.component.html',
  styleUrls: ['./detalle-vivienda.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class DetalleViviendaComponent {
  @Input() propiedad: any;
  @Output() cerrar = new EventEmitter<void>();

  tiposPropiedad: any[] = [];
  esAdmin: boolean = false;  // <-- bandera para saber si es admin

  constructor(
    private tipoPropiedadService: TipoPropiedadService,
    private authService: AuthService // <-- Inyecta AuthService
  ) {
    this.cargarTiposPropiedad();

    const usuario = this.authService.getCurrentUser();
    this.esAdmin = usuario?.rol === 'admin';
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
