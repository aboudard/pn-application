import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { MetaReglementComponent } from './meta-reglement.component';
import { MetaReglementDetailComponent } from './meta-reglement-detail.component';
import { MetaReglementUpdateComponent } from './meta-reglement-update.component';
import { MetaReglementDeleteDialogComponent } from './meta-reglement-delete-dialog.component';
import { metaReglementRoute } from './meta-reglement.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(metaReglementRoute)],
  declarations: [MetaReglementComponent, MetaReglementDetailComponent, MetaReglementUpdateComponent, MetaReglementDeleteDialogComponent],
  entryComponents: [MetaReglementDeleteDialogComponent]
})
export class PnApplicationMetaReglementModule {}
