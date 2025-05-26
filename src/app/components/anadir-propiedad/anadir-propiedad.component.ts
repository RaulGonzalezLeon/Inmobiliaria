import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Propiedades } from '../../models/Propiedades';
import { PropiedadesService } from '../../propiedades.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Importar Router

@Component({
  selector: 'app-anadir-propiedad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './anadir-propiedad.component.html',
  styleUrls: ['./anadir-propiedad.component.css']
})
export class AnadirPropiedadComponent implements OnInit {
  valido: boolean = true;
  mostrarBanner: boolean = false;
  propiedad: Propiedades = new Propiedades(0, "", "", "", "", "", 0, 0, 0, 0, '');
  imagenSeleccionada: File | null = null;

  // Lista de tipos de propiedad
  tiposPropiedad: any[] = [];

  // ✅ Inyección del servicio Router
  constructor(
    private PropiedadesServicio: PropiedadesService,
    private router: Router
  ) {}

  // Capturar archivo y convertirlo a Base64
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.propiedad.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Envío del formulario
  onSubmit(event: Event): void {
    event.preventDefault();  // Previene envío automático
    this.validar();
    if (this.valido) {
      this.alta();
    }
  }

  // Alta de propiedad y redirección tras éxito
  alta() {
    this.PropiedadesServicio.alta(this.propiedad).subscribe((resp: any) => {
      console.log(resp);
      if (resp.resultado === 'OK') {
        this.mostrarBanner = true;
        setTimeout(() => {
          this.mostrarBanner = false;
          this.router.navigate(['/login']); // ✅ Redirección al componente login
        }, 3000);
      }
    });
  }

  // Validación del formulario
  validar() {
    this.valido = true;

    const reglas = [
      { id: "titulo", valor: this.propiedad.titulo, min: 4, max: 150 },
      { id: "tipo", valor: this.propiedad.tipo_propiedad },
      { id: "descripcion", valor: this.propiedad.descripcion, min: 10, max: 300 },
      { id: "direccion", valor: this.propiedad.direccion, min: 4, max: 150 },
      { id: "ciudad", valor: this.propiedad.ciudad, min: 2, max: 100 },
      { id: "precio", valor: this.propiedad.precio, min: 50000 },
      { id: "habitaciones", valor: this.propiedad.habitaciones, min: 1 },
      { id: "banos", valor: this.propiedad.banos, min: 1 },
      { id: "superficie", valor: this.propiedad.superficie, min: 30 }
    ];

    reglas.forEach(regla => {
      const input = document.getElementById(regla.id) as HTMLInputElement;
      let esValido = true;

      if (typeof regla.valor === 'string') {
        const longitud = regla.valor.trim().length;
        if ((regla.min && longitud < regla.min) || (regla.max && longitud > regla.max)) {
          esValido = false;
        }
      } else if (typeof regla.valor === 'number') {
        if (regla.min && regla.valor < regla.min) {
          esValido = false;
        }
      } else {
        esValido = false;
      }

      if (!esValido) {
        input?.classList.add("is-invalid");
        this.valido = false;
      } else {
        input?.classList.remove("is-invalid");
      }
    });
  }

  // Obtener tipos de propiedad
  ngOnInit() {
    this.PropiedadesServicio.getTiposPropiedad().subscribe((data: any) => {
      this.tiposPropiedad = data;
    });
  }
}
