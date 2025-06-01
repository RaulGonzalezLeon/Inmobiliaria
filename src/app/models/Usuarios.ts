export class Usuario {
  correo: string;      
  rol: string;
  contrasena?: string; 

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
