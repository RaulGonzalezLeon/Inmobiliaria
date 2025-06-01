import { Component, OnInit } from '@angular/core';
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
export class AnadirTipopropiedadComponent implements OnInit {
  tipo: TipoPropiedad = new TipoPropiedad(0, '');
  mostrarBanner: boolean = false;
  valido: boolean = true;
  tiposExistentes: TipoPropiedad[] = [];

  // Nuevas variables para mensajes separados
  nombreVacio: boolean = false;
  nombreDuplicado: boolean = false;

  constructor(private tipoServicio: TipoPropiedadService) {}

  ngOnInit(): void {
    this.tipoServicio.recuperarTodos().subscribe((tipos: any) => {
      this.tiposExistentes = tipos.map((t: any) => new TipoPropiedad(t.id, t.nombre));
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.validar();
    if (this.valido) {
      this.alta();
    }
  }

  validar() {
    const input = document.getElementById('nombre') as HTMLInputElement;
    const nombreTrimmed = this.tipo.nombre.trim().toLowerCase();

    // Separación de errores
    this.nombreVacio = nombreTrimmed === '';
    this.nombreDuplicado = this.tiposExistentes.some(
      tipo => tipo.nombre.trim().toLowerCase() === nombreTrimmed
    );

    this.valido = !(this.nombreVacio || this.nombreDuplicado);

    if (!this.valido) {
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-invalid');
    }
  }

  alta() {
    this.tipoServicio.alta(this.tipo).subscribe((resp: any) => {
      if (resp.resultado === 'OK') {
        this.mostrarBanner = true;
        this.tipo = new TipoPropiedad(0, '');

        this.tipoServicio.recuperarTodos().subscribe((tipos: any) => {
          this.tiposExistentes = tipos.map((t: any) => new TipoPropiedad(t.id, t.nombre));
        });

        setTimeout(() => {
          this.mostrarBanner = false;
        }, 3000);
      }
    });
  }
}
