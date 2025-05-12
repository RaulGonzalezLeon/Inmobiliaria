import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Propiedades } from '../../models/Propiedades';
import { PropiedadesService } from '../../propiedades.service';
import { CommonModule } from '@angular/common';

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

  constructor(private PropiedadesServicio: PropiedadesService) {}

  // Método para capturar el archivo y convertirlo a Base64
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

  // Método que se ejecuta al enviar el formulario
  onSubmit(event: Event): void {
    event.preventDefault();  // Previene el envío por defecto del formulario
    this.validar();
    if (this.valido) {
      this.alta();
    }
  }

  // Método para enviar la propiedad (alta)
  alta() {
    this.PropiedadesServicio.alta(this.propiedad).subscribe((resp: any) => {
      console.log(resp);
      if (resp.resultado === 'OK') {
        this.mostrarBanner = true;
        setTimeout(() => {
          this.mostrarBanner = false;
        }, 3000);
      }
    });
  }

  // Método de validación
  validar() {
    this.valido = true;

    let campos = [
      { id: "titulo", valor: this.propiedad.titulo },
      { id: "tipo", valor: this.propiedad.tipo_propiedad },
      { id: "descripcion", valor: this.propiedad.descripcion },
      { id: "direccion", valor: this.propiedad.direccion },
      { id: "ciudad", valor: this.propiedad.ciudad },
      { id: "precio", valor: this.propiedad.precio, minimo: 1 },
      { id: "habitaciones", valor: this.propiedad.habitaciones, minimo: 1 },
      { id: "banos", valor: this.propiedad.banos, minimo: 1 },
      { id: "superficie", valor: this.propiedad.superficie, minimo: 1 }
    ];

    campos.forEach(campo => {
      let input = document.getElementById(campo.id) as HTMLInputElement;
      if (!campo.valor || (campo.minimo && campo.valor < campo.minimo)) {
        input.classList.add("is-invalid");
        this.valido = false;
      } else {
        input.classList.remove("is-invalid");
      }
    });
  }

  // Método para obtener los tipos de propiedad
  ngOnInit() {
    this.PropiedadesServicio.getTiposPropiedad().subscribe((data: any) => {
      this.tiposPropiedad = data;
    });
  }
}





