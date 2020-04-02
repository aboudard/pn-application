import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { MetaCoherisComponent } from './meta-coheris.component';
import { MetaCoherisDetailComponent } from './meta-coheris-detail.component';
import { MetaCoherisUpdateComponent } from './meta-coheris-update.component';
import { MetaCoherisDeleteDialogComponent } from './meta-coheris-delete-dialog.component';
import { metaCoherisRoute } from './meta-coheris.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(metaCoherisRoute)],
  declarations: [MetaCoherisComponent, MetaCoherisDetailComponent, MetaCoherisUpdateComponent, MetaCoherisDeleteDialogComponent],
  entryComponents: [MetaCoherisDeleteDialogComponent]
})
export class PnApplicationMetaCoherisModule {}
