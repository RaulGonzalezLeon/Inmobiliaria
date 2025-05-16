export class Usuario {
  correo: string;      // formato: YYYY-MM-DD
  rol: string;
  contrasena?: string; // opcional para evitar exponerla al recuperar usuarios

  constructor(
    correo: string,
    rol: string,
    contrasena?: string
  ) {
    this.correo = correo;
    this.rol = rol;
    this.contrasena = contrasena;
  }
}
