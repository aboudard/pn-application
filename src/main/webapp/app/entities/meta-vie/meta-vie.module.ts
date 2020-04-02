import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { MetaVieComponent } from './meta-vie.component';
import { MetaVieDetailComponent } from './meta-vie-detail.component';
import { MetaVieUpdateComponent } from './meta-vie-update.component';
import { MetaVieDeleteDialogComponent } from './meta-vie-delete-dialog.component';
import { metaVieRoute } from './meta-vie.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(metaVieRoute)],
  declarations: [MetaVieComponent, MetaVieDetailComponent, MetaVieUpdateComponent, MetaVieDeleteDialogComponent],
  entryComponents: [MetaVieDeleteDialogComponent]
})
export class PnApplicationMetaVieModule {}
