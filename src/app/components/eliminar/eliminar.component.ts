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
  propiedadborrada: any;

  constructor(private propiedadesServicio: PropiedadesService) {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.propiedadesServicio.recuperarTodos().subscribe((respuesta: any) => {
      this.propiedades = respuesta;
    });
  }

  baja(propiedad: Propiedades) {
    this.propiedadesServicio.baja(propiedad).subscribe((datos: any) => {
      if (datos['resultado'] === 'OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }

  articuloAEliminar(propiedad: any) {
    this.propiedadborrada = propiedad;
  }

  confirmarBaja() {
    if (this.propiedadborrada) {
      this.baja(this.propiedadborrada);
    }
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}



