import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { ParamDemandeComponent } from './param-demande.component';
import { ParamDemandeDetailComponent } from './param-demande-detail.component';
import { ParamDemandeUpdateComponent } from './param-demande-update.component';
import { ParamDemandeDeleteDialogComponent } from './param-demande-delete-dialog.component';
import { paramDemandeRoute } from './param-demande.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(paramDemandeRoute)],
  declarations: [ParamDemandeComponent, ParamDemandeDetailComponent, ParamDemandeUpdateComponent, ParamDemandeDeleteDialogComponent],
  entryComponents: [ParamDemandeDeleteDialogComponent]
})
export class PnApplicationParamDemandeModule {}
