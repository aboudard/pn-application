import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { MetaProductionComponent } from './meta-production.component';
import { MetaProductionDetailComponent } from './meta-production-detail.component';
import { MetaProductionUpdateComponent } from './meta-production-update.component';
import { MetaProductionDeleteDialogComponent } from './meta-production-delete-dialog.component';
import { metaProductionRoute } from './meta-production.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(metaProductionRoute)],
  declarations: [
    MetaProductionComponent,
    MetaProductionDetailComponent,
    MetaProductionUpdateComponent,
    MetaProductionDeleteDialogComponent
  ],
  entryComponents: [MetaProductionDeleteDialogComponent]
})
export class PnApplicationMetaProductionModule {}
