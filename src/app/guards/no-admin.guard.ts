import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const usuario = this.authService.getCurrentUser();

    if (usuario?.rol === 'admin') {
      // Si es admin, redirige a inicio o donde quieras
      this.router.navigate(['/']);
      return false; // Bloquea acceso
    }
    return true; // Permite acceso si NO es admin
  }
}
