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
  prop: Propiedades = { id: 0, titulo: '', tipo_propiedad: '', descripcion: '', direccion: '', ciudad: '', precio: 0, habitaciones: 0, banos: 0, superficie: 0, imagen: ''};

  constructor(private propiedadesServicio: PropiedadesService) {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.propiedadesServicio.recuperarTodos().subscribe((respuesta: any) => {
      this.propiedades = respuesta;
    });
  }

  modificacion() {
    this.propiedadesServicio.modificacion(this.prop).subscribe((datos: any) => {
      if (datos['resultado'] === 'OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }

  seleccionar(propiedad: Propiedades) {
    this.propiedadesServicio.seleccionar(propiedad)
      .subscribe((result: any) => (this.prop = result[0]));
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
