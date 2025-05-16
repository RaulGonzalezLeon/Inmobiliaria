import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../app/models/Usuarios';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;

  constructor(private http: HttpClient, private router: Router) {
    // Obtener el usuario actual desde localStorage
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>('http://localhost/archivos_php_usuarios/login.php', {
      correo: usuario.correo,
      contrasena: usuario.contrasena,
    }).pipe(
      map((response: any) => {
        if (response.resultado === 'OK') {
          // Guardar los datos del usuario en el almacenamiento local
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
          this.currentUserSubject.next(response.usuario); // Actualizar el usuario actual
          // Redirigir según el rol
          if (response.usuario.rol === 'admin') {
            this.router.navigate(['/inicio']);
          } else {
            this.router.navigate(['/anadir']);
          }
        } else {
          throw new Error(response.mensaje);
        }
        return response; // Retornar la respuesta
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        throw error; // Lanzar error para que el componente lo pueda manejar
      })
    );
  }

  logout(): void {
    // Eliminar el usuario actual del localStorage y actualizar el BehaviorSubject
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Obtener el usuario actual
  get currentUserValue(): Usuario {
    return this.currentUserSubject.value as Usuario;
  }
}
