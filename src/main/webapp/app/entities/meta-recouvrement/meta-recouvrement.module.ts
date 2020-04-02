import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { MetaRecouvrementComponent } from './meta-recouvrement.component';
import { MetaRecouvrementDetailComponent } from './meta-recouvrement-detail.component';
import { MetaRecouvrementUpdateComponent } from './meta-recouvrement-update.component';
import { MetaRecouvrementDeleteDialogComponent } from './meta-recouvrement-delete-dialog.component';
import { metaRecouvrementRoute } from './meta-recouvrement.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(metaRecouvrementRoute)],
  declarations: [
    MetaRecouvrementComponent,
    MetaRecouvrementDetailComponent,
    MetaRecouvrementUpdateComponent,
    MetaRecouvrementDeleteDialogComponent
  ],
  entryComponents: [MetaRecouvrementDeleteDialogComponent]
})
export class PnApplicationMetaRecouvrementModule {}
