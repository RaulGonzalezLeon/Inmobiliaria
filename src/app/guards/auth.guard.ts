// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.authService.getCurrentUser();

    if (!user) {
      return this.router.parseUrl('/login'); // no logueado
    }

    if (user.rol === 'admin') {
      return true; // tiene permiso
    }

    // Usuario normal: lo redirigimos a inicio o donde quieras
    return this.router.parseUrl('/inicio');
  }
}
