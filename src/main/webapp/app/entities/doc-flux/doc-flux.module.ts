import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { DocFluxComponent } from './doc-flux.component';
import { DocFluxDetailComponent } from './doc-flux-detail.component';
import { DocFluxUpdateComponent } from './doc-flux-update.component';
import { DocFluxDeleteDialogComponent } from './doc-flux-delete-dialog.component';
import { docFluxRoute } from './doc-flux.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(docFluxRoute)],
  declarations: [DocFluxComponent, DocFluxDetailComponent, DocFluxUpdateComponent, DocFluxDeleteDialogComponent],
  entryComponents: [DocFluxDeleteDialogComponent]
})
export class PnApplicationDocFluxModule {}
