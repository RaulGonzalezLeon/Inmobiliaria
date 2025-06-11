import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AnadirPropiedadComponent } from './components/anadir-propiedad/anadir-propiedad.component';
import { AnadirTipopropiedadComponent } from './components/anadir-tipopropiedad/anadir-tipopropiedad.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { LoginComponent } from './components/login/login.component';
import { AnadirUsuarioComponent } from './components/anadir-usuario/anadir-usuario.component'; 
import { AnadirContactoComponent } from './components/anadir-contacto/anadir-contacto.component'; 
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { DetalleViviendaComponent } from './components/detalle-vivienda/detalle-vivienda.component';
import { NoAdminGuard } from './guards/no-admin.guard';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { VerContactosComponent } from './components/ver-contactos/ver-contactos.component';
import { EliminarContactoComponent } from './components/eliminar-contacto/eliminar-contacto.component'; 

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'anadir', component: AnadirPropiedadComponent, canActivate: [AuthGuard] },
  { path: 'anadir-tipo', component: AnadirTipopropiedadComponent, canActivate: [AuthGuard] },
  { path: 'eliminar', component: EliminarComponent, canActivate: [AuthGuard] },
  { path: 'modificar', component: ModificarComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'anadir-usuario', component: AnadirUsuarioComponent, canActivate: [NoAuthGuard] },
  { path: 'anadir-contacto', component: AnadirContactoComponent, canActivate: [NoAdminGuard] }, 
  { path: 'vivienda/:id', component: DetalleViviendaComponent },
  { path: 'anadir-contacto/:id', component: AnadirContactoComponent },
  { path: 'cambiar-contrasena', component: CambiarContrasenaComponent, canActivate: [NoAuthGuard] },
  { path: 'ver-contactos', component: VerContactosComponent, canActivate: [AuthGuard] },
  { path: 'eliminar-contacto', component: EliminarContactoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];
