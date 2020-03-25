import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { AuditComponent } from './audit.component';
import { AuditDetailComponent } from './audit-detail.component';
import { AuditUpdateComponent } from './audit-update.component';
import { AuditDeleteDialogComponent } from './audit-delete-dialog.component';
import { auditRoute } from './audit.route';

@NgModule({
  imports: [PnApplicationSharedModule, RouterModule.forChild(auditRoute)],
  declarations: [AuditComponent, AuditDetailComponent, AuditUpdateComponent, AuditDeleteDialogComponent],
  entryComponents: [AuditDeleteDialogComponent]
})
export class PnApplicationAuditModule {}
