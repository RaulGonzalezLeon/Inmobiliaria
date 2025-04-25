export class Propiedades {
  id: number;
  titulo: string;
  tipo_propiedad: string;
  descripcion: string;
  direccion: string;
  ciudad: string;
  precio: number;
  habitaciones: number;
  banos: number;
  superficie: number;
  imagen: string;

  constructor(id: number, titulo: string, tipo_propiedad: string, descripcion: string, direccion: string, ciudad: string,
    precio: number, habitaciones: number, banos: number, superficie: number, imagen: string) {
    this.id = id;
    this.titulo = titulo;
    this.tipo_propiedad = tipo_propiedad;
    this.descripcion = descripcion;
    this.direccion = direccion;
    this.ciudad = ciudad;
    this.precio = precio;
    this.habitaciones = habitaciones;
    this.banos = banos;
    this.superficie = superficie;
    this.imagen = imagen;
  }
}
