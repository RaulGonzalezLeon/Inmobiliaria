import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AnadirPropiedadComponent } from './components/anadir-propiedad/anadir-propiedad.component';
import { AnadirTipopropiedadComponent } from './components/anadir-tipopropiedad/anadir-tipopropiedad.component'; // Importa el componente
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { ModificarComponent } from './components/modificar/modificar.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'anadir', component: AnadirPropiedadComponent },
    { path: 'anadir-tipo', component: AnadirTipopropiedadComponent },
    { path: 'eliminar', component: EliminarComponent },
    { path: 'modificar', component: ModificarComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];
