import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'demande',
        loadChildren: () => import('./demande/demande.module').then(m => m.PnApplicationDemandeModule)
      },
      {
        path: 'meta-production',
        loadChildren: () => import('./meta-production/meta-production.module').then(m => m.PnApplicationMetaProductionModule)
      },
      {
        path: 'doc-flux',
        loadChildren: () => import('./doc-flux/doc-flux.module').then(m => m.PnApplicationDocFluxModule)
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.PnApplicationAuditModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class PnApplicationEntityModule {}
