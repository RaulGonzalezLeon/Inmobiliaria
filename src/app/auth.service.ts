import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../app/models/Usuarios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'currentUser';
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser$: Observable<Usuario | null>;

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = localStorage.getItem(this.STORAGE_KEY);
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /** Intenta iniciar sesión y guarda el usuario si tiene éxito */
  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>('http://localhost/archivos_php_usuarios/login.php', {
      correo: usuario.correo,
      contrasena: usuario.contrasena,
    }).pipe(
      tap(response => {
        if (response.resultado === 'OK' && response.usuario) {
          this.setSession(response.usuario);
          this.redirectUser(response.usuario.rol);
        } else {
          throw new Error(response.mensaje || 'Login fallido');
        }
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  /** Cierra la sesión */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /** Devuelve `true` si hay un usuario autenticado */
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /** Devuelve el usuario actual */
  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  getUserRole(): string {
  return this.currentUserSubject.value?.rol ?? '';
}

  /** Guarda el usuario en localStorage y actualiza el subject */
  private setSession(usuario: Usuario): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    this.currentUserSubject.next(usuario);
  }

  /** Redirige según el rol del usuario */
  private redirectUser(rol: string): void {
    if (rol === 'admin') {
      this.router.navigate(['/inicio']);
    } else {
      this.router.navigate(['/anadir']);
    }
  }
}
