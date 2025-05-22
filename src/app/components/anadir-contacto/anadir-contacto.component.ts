import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from '../../models/Contacto';
import { ContactosService } from '../../contacto.service';
import { PropiedadesService } from '../../propiedades.service';
import { Propiedades } from '../../models/Propiedades';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';  // <-- para query params
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './anadir-contacto.component.html',
  styleUrl: './anadir-contacto.component.css'
})
export class AnadirContactoComponent {
  contactoForm: FormGroup;
  enviado: boolean = false;
  error: string = '';
  propiedades: Propiedades[] = [];

  constructor(
    private fb: FormBuilder,
    private contactosService: ContactosService,
    private propiedadesService: PropiedadesService,
    private authService: AuthService,
    private route: ActivatedRoute  // <-- inyectar ActivatedRoute
  ) {
    const user = this.authService.getCurrentUser();

    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: [{ value: user?.correo || '', disabled: true }, [Validators.required, Validators.email]],
      telefono: [''],
      propiedad_id: [null, Validators.required],
      asunto: ['', Validators.required]
    });

    // Cargar propiedades para desplegable
    this.propiedadesService.recuperarTodos().subscribe((res: any) => {
      this.propiedades = res;
    });

    // Leer query param para propiedad_id y asignarlo si existe
    this.route.queryParams.subscribe(params => {
      const propiedadId = params['propiedad_id'];
      if (propiedadId) {
        this.contactoForm.patchValue({ propiedad_id: +propiedadId });
      }
    });
  }

  enviar() {
    this.enviado = false;
    this.error = '';

    if (this.contactoForm.invalid) {
      this.error = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    // Habilitar el campo correo para que se incluya en el value
    this.contactoForm.get('correo')?.enable();
    const contacto: Contacto = this.contactoForm.value;
    // Volver a deshabilitar
    this.contactoForm.get('correo')?.disable();

    this.contactosService.alta(contacto).subscribe({
      next: () => {
        this.enviado = true;
        this.contactoForm.reset();

        // Reestablecer correo y deshabilitarlo tras reset
        const user = this.authService.getCurrentUser();
        this.contactoForm.patchValue({ correo: user?.correo || '' });
        this.contactoForm.get('correo')?.disable();
      },
      error: err => {
        this.error = 'Error al enviar el contacto. Intenta más tarde.';
        console.error(err);
      }
    });
  }
}
