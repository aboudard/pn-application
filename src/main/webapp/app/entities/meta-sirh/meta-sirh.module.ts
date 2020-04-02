import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { MetaSIRHComponent } from './meta-sirh.component';
import { MetaSIRHDetailComponent } from './meta-sirh-detail.component';
import { MetaSIRHUpdateComponent } from './meta-sirh-update.component';
import { MetaSIRHDeleteDialogComponent } from './meta-sirh-delete-dialog.component';
import { metaSIRHRoute } from './meta-sirh.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(metaSIRHRoute)],
  declarations: [MetaSIRHComponent, MetaSIRHDetailComponent, MetaSIRHUpdateComponent, MetaSIRHDeleteDialogComponent],
  entryComponents: [MetaSIRHDeleteDialogComponent]
})
export class PnApplicationMetaSIRHModule {}
