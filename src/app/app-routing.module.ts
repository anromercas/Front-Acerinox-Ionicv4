import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: './pages/home2/home2.module#Home2PageModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: '',
    redirectTo: 'home2',
    pathMatch: 'full'
  },
  { path: 'home2', loadChildren: './pages/home2/home2.module#Home2PageModule', canLoad: [ UsuarioGuard ] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canLoad: [ UsuarioGuard ]},
  { path: 'basura', loadChildren: './pages/basura/basura.module#BasuraPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'califica', loadChildren: './pages/califica/califica.module#CalificaPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'ejemplos', loadChildren: './pages/ejemplos/ejemplos.module#EjemplosPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'nueva-basura', loadChildren: './pages/nueva-basura/nueva-basura.module#NuevaBasuraPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'zona', loadChildren: './pages/zona/zona.module#ZonaPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'listado-zonas', loadChildren: './pages/listado-zonas/listado-zonas.module#ListadoZonasPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'tareas', loadChildren: './pages/tareas/tareas.module#TareasPageModule', canLoad: [ UsuarioGuard ] },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
