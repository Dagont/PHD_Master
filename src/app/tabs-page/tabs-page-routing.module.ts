import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPagePage } from './tabs-page.page';

const routes: Routes = [
  {
    path: 'tabs-page',
    component: TabsPagePage,
    children: [
      {
        path: 'paciente',
        loadChildren: () => import('../paciente/paciente.module').then( m => m.PacientePageModule)
      },
      {
        path: 'valoracion',
        loadChildren: () => import('../valoracion/valoracion.module').then( m => m.ValoracionPageModule)
      },
      {
        path: 'estimacion-ingesta',
        loadChildren: () => import('../estimacion-ingesta/estimacion-ingesta.module').then( m => m.EstimacionIngestaPageModule)
      },
      {
        path: 'diagnostico',
        loadChildren: () => import('../diagnostico/diagnostico.module').then( m => m.DiagnosticoPageModule)
      },
      {
        path: 'requerimientos',
        loadChildren: () => import('../requerimientos/requerimientos.module').then( m => m.RequerimientosPageModule)
      },
      {
        path: 'calculadora',
        loadChildren: () => import('../calculadora/calculadora.module').then( m => m.CalculadoraPageModule)
      }
    ]
  },

  {
    path: '',
    redirectTo: 'tabs-page/paciente',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPagePageRoutingModule {}
