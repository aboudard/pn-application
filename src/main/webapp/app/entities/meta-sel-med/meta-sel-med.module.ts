import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { MetaSelMedComponent } from './meta-sel-med.component';
import { MetaSelMedDetailComponent } from './meta-sel-med-detail.component';
import { MetaSelMedUpdateComponent } from './meta-sel-med-update.component';
import { MetaSelMedDeleteDialogComponent } from './meta-sel-med-delete-dialog.component';
import { metaSelMedRoute } from './meta-sel-med.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(metaSelMedRoute)],
  declarations: [MetaSelMedComponent, MetaSelMedDetailComponent, MetaSelMedUpdateComponent, MetaSelMedDeleteDialogComponent],
  entryComponents: [MetaSelMedDeleteDialogComponent]
})
export class PnApplicationMetaSelMedModule {}
