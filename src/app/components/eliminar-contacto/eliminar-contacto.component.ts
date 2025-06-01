import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactosService } from '../../contacto.service';
import { Contacto } from '../../models/Contacto';

@Component({
  selector: 'app-eliminar-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-contacto.component.html',
  styleUrls: ['./eliminar-contacto.component.css']
})
export class EliminarContactoComponent implements OnInit {
  contactos: Contacto[] = [];
  mensaje: string = '';
  error: string = '';

  constructor(private contactosService: ContactosService) {}

  ngOnInit(): void {
    this.recuperarContactos();
  }

  recuperarContactos(): void {
    this.contactosService.recuperarTodos().subscribe({
      next: (res) => this.contactos = res,
      error: (err) => {
        this.error = 'Error al recuperar los contactos.';
        console.error(err);
      }
    });
  }

  eliminarContacto(contacto: Contacto): void {
    this.contactosService.baja(contacto).subscribe({
      next: (res: any) => {
        if (res.resultado === 'OK') {
          this.mensaje = 'Contacto eliminado correctamente.';
          this.contactos = this.contactos.filter(c => c.id !== contacto.id);
        } else {
          this.mensaje = 'Error al eliminar el contacto.';
        }
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: (err) => {
        this.mensaje = 'Error al eliminar el contacto.';
        console.error(err);
        setTimeout(() => this.mensaje = '', 3000);
      }
    });
  }

  trackById(index: number, item: Contacto) {
    return item.id;
  }
}
