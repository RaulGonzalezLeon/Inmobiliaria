import { Component, OnInit } from '@angular/core';
import { Contacto } from '../../models/Contacto';
import { ContactosService } from '../../contacto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  contactos: Contacto[] = [];
  contactoForm: FormGroup;
  editando: boolean = false;

  constructor(
    private contactosService: ContactosService,
    private fb: FormBuilder
  ) {
    this.contactoForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      propiedad_id: [null, Validators.required],
      asunto: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarContactos();
  }

  cargarContactos() {
    this.contactosService.recuperarTodos().subscribe({
      next: (data: any) => {
        this.contactos = data;
      },
      error: (err) => {
        console.error('Error al cargar contactos', err);
      },
    });
  }

  guardar() {
    if (this.contactoForm.invalid) return;

    const contacto: Contacto = this.contactoForm.value;

    if (this.editando) {
      this.contactosService.modificacion(contacto).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarContactos();
          this.editando = false;
        },
        error: (err) => console.error('Error al modificar', err),
      });
    } else {
      this.contactosService.alta(contacto).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarContactos();
        },
        error: (err) => console.error('Error al crear', err),
      });
    }
  }

  editar(contacto: Contacto) {
    this.editando = true;
    this.contactoForm.patchValue(contacto);
  }

  eliminar(contacto: Contacto) {
    if (confirm(`¿Borrar contacto de ${contacto.nombre}?`)) {
      this.contactosService.baja(contacto).subscribe({
        next: () => this.cargarContactos(),
        error: (err) => console.error('Error al borrar', err),
      });
    }
  }

  limpiarFormulario() {
    this.contactoForm.reset();
    this.editando = false;
  }
}

