import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from '../../models/Contacto';
import { ContactosService } from '../../contacto.service';
import { PropiedadesService } from '../../propiedades.service';
import { Propiedades } from '../../models/Propiedades';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../email.service';
import { Router } from '@angular/router';

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
  formularioEnviado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactosService: ContactosService,
    private propiedadesService: PropiedadesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private emailService: EmailService,
    private router: Router
  ) {
    const user = this.authService.getCurrentUser();

    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      correo: [{ value: user?.correo || '', disabled: true }, [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      propiedad_id: [null, Validators.required],
      asunto: ['', Validators.required]
    });

    this.propiedadesService.recuperarTodos().subscribe((res: any) => {
      this.propiedades = res;
    });

    this.route.queryParams.subscribe(params => {
      const propiedadId = params['propiedad_id'];
      if (propiedadId) {
        this.contactoForm.patchValue({ propiedad_id: +propiedadId });
      }
    });
  }

  getError(campo: string): string | null {
    const control = this.contactoForm.get(campo);
    if (!control || !control.errors) return null;

    if (control.errors['required']) return 'Este campo es obligatorio.';
    if (campo === 'nombre' && control.errors['minlength']) return 'El nombre debe tener al menos 2 caracteres.';
    if (campo === 'correo' && control.errors['email']) return 'El formato del correo no es válido.';
    if (campo === 'telefono' && control.errors['pattern']) return 'El teléfono debe tener exactamente 9 dígitos numéricos.';

    return 'Campo inválido.';
  }

enviar() {
  this.enviado = false;
  this.error = '';
  this.formularioEnviado = true;

  if (this.contactoForm.invalid) {
    this.error = 'Por favor completa todos los campos obligatorios.';
    return;
  }

  this.contactoForm.get('correo')?.enable();
  const contacto: Contacto = this.contactoForm.value;
  this.contactoForm.get('correo')?.disable();

  this.contactosService.alta(contacto).subscribe({
    next: (res: any) => {
      if (res.resultado === 'OK' && res.id) {
        this.emailService.sendEmail({
          id: res.id, // 👈 incluimos el ID en el email
          nombre: contacto.nombre,
          correo: contacto.correo,
          telefono: contacto.telefono,
          propiedad_id: contacto.propiedad_id,
          asunto: contacto.asunto
        }).then(() => {
          this.enviado = true;
          this.contactoForm.reset();
          const user = this.authService.getCurrentUser();
          this.contactoForm.patchValue({ correo: user?.correo || '' });
          this.contactoForm.get('correo')?.disable();
          this.formularioEnviado = false;

          this.router.navigate(['/inicio']);
        }).catch(err => {
          this.error = 'Error al enviar el correo.';
          console.error(err);
        });
      } else {
        this.error = 'Error: no se recibió ID del contacto.';
        console.error('Respuesta sin ID:', res);
      }
    },
    error: err => {
      this.error = 'Error al guardar el contacto. Intenta más tarde.';
      console.error(err);
    }
  });
}
}
