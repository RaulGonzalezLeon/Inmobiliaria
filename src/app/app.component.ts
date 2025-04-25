import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnadirPropiedadComponent } from "./components/anadir-propiedad/anadir-propiedad.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { EliminarComponent } from './components/eliminar/eliminar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnadirPropiedadComponent, MenuComponent, FooterComponent, EliminarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Inmobiliaria';
}
