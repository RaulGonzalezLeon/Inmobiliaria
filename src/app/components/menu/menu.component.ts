import { Component, inject, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class MenuComponent implements AfterViewInit {
  authService = inject(AuthService);
  router = inject(Router);
  renderer = inject(Renderer2);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.fixed-nav');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        this.renderer.addClass(navbar, 'hide-nav'); // Oculta al bajar
      } else {
        this.renderer.removeClass(navbar, 'hide-nav'); // Muestra al subir
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  get isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  get isUser(): boolean {
    return this.authService.getUserRole() === 'user';
  }
}
