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
      },
      {
        path: 'meta-recouvrement',
        loadChildren: () => import('./meta-recouvrement/meta-recouvrement.module').then(m => m.PnApplicationMetaRecouvrementModule)
      },
      {
        path: 'meta-vie',
        loadChildren: () => import('./meta-vie/meta-vie.module').then(m => m.PnApplicationMetaVieModule)
      },
      {
        path: 'meta-sel-med',
        loadChildren: () => import('./meta-sel-med/meta-sel-med.module').then(m => m.PnApplicationMetaSelMedModule)
      },
      {
        path: 'meta-sirh',
        loadChildren: () => import('./meta-sirh/meta-sirh.module').then(m => m.PnApplicationMetaSIRHModule)
      },
      {
        path: 'meta-coheris',
        loadChildren: () => import('./meta-coheris/meta-coheris.module').then(m => m.PnApplicationMetaCoherisModule)
      },
      {
        path: 'meta-reglement',
        loadChildren: () => import('./meta-reglement/meta-reglement.module').then(m => m.PnApplicationMetaReglementModule)
      },
      {
        path: 'param-demande',
        loadChildren: () => import('./param-demande/param-demande.module').then(m => m.PnApplicationParamDemandeModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class PnApplicationEntityModule {}
