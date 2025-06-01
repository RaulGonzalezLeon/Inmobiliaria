import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactosService } from '../../contacto.service';
import { Contacto } from '../../models/Contacto';

@Component({
  selector: 'app-ver-contactos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-contactos.component.html',
  styleUrls: ['./ver-contactos.component.css']
})
export class VerContactosComponent implements OnInit {
  contactos: Contacto[] = [];
  correoSeleccionado: string = '';
  error: string = '';

  constructor(private contactosService: ContactosService) {}

  ngOnInit(): void {
    this.contactosService.recuperarTodos().subscribe({
      next: (res: Contacto[]) => {
        this.contactos = res;
      },
      error: (err) => {
        this.error = 'Error al recuperar los contactos.';
        console.error(err);
      }
    });
  }

  get correosUnicos(): string[] {
    const correos = this.contactos.map(c => c.correo);
    return [...new Set(correos)];
  }

get contactosFiltrados(): Contacto[] {
  const filtro = this.correoSeleccionado.trim().toLowerCase();
  if (!filtro) return this.contactos;
  return this.contactos.filter(c =>
    c.correo.toLowerCase().includes(filtro)
  );
}
}
