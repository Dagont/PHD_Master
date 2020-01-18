import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'slides', pathMatch: 'full' },
  {
    path: 'slides',
    loadChildren: () => import('./slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'tabs-page',
    //redirectTo: './tabs-page/tabs-page.module'
    loadChildren: () => import('./tabs-page/tabs-page.module').then( m => m.TabsPagePageModule)
  },
  {
    path: 'listado-pacientes',
    loadChildren: () => import('./listado-pacientes/listado-pacientes.module').then( m => m.ListadoPacientesPageModule)
  }
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
