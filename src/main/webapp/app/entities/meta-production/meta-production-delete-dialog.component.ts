import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetaProduction } from 'app/shared/model/meta-production.model';
import { MetaProductionService } from './meta-production.service';

@Component({
  templateUrl: './meta-production-delete-dialog.component.html'
})
export class MetaProductionDeleteDialogComponent {
  metaProduction?: IMetaProduction;

  constructor(
    protected metaProductionService: MetaProductionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.metaProductionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('metaProductionListModification');
      this.activeModal.close();
    });
  }
}
