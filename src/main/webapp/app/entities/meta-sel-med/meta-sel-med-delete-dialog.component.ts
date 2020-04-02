import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetaSelMed } from 'app/shared/model/meta-sel-med.model';
import { MetaSelMedService } from './meta-sel-med.service';

@Component({
  templateUrl: './meta-sel-med-delete-dialog.component.html'
})
export class MetaSelMedDeleteDialogComponent {
  metaSelMed?: IMetaSelMed;

  constructor(
    protected metaSelMedService: MetaSelMedService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.metaSelMedService.delete(id).subscribe(() => {
      this.eventManager.broadcast('metaSelMedListModification');
      this.activeModal.close();
    });
  }
}
