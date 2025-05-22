export class Contacto {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  propiedad_id: number;
  asunto: string;

  constructor(
    id: number,
    nombre: string,
    correo: string,
    telefono: string,
    propiedad_id: number,
    asunto: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.telefono = telefono;
    this.propiedad_id = propiedad_id;
    this.asunto = asunto;
  }
}
