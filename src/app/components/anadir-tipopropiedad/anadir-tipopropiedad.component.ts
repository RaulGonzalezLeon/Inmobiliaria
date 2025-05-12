import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoPropiedad } from '../../models/Tipo_propiedad';
import { TipoPropiedadService } from '../../tipo-propiedad.service';

@Component({
  selector: 'app-anadir-tipopropiedad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './anadir-tipopropiedad.component.html',
  styleUrls: ['./anadir-tipopropiedad.component.css']
})
export class AnadirTipopropiedadComponent {
  tipo: TipoPropiedad = new TipoPropiedad(0, '');
  mostrarBanner: boolean = false;
  valido: boolean = true;

  constructor(private tipoServicio: TipoPropiedadService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.validar();
    if (this.valido) {
      this.alta();
    }
  }

  validar() {
    this.valido = true;
    const input = document.getElementById('nombre') as HTMLInputElement;

    if (!this.tipo.nombre.trim()) {
      input.classList.add('is-invalid');
      this.valido = false;
    } else {
      input.classList.remove('is-invalid');
    }
  }

  alta() {
    this.tipoServicio.alta(this.tipo).subscribe((resp: any) => {
      if (resp.resultado === 'OK') {
        this.mostrarBanner = true;
        this.tipo = new TipoPropiedad(0, '');
        setTimeout(() => {
          this.mostrarBanner = false;
        }, 3000);
      }
    });
  }
}

