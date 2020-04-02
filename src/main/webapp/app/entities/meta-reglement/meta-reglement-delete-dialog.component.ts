import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetaReglement } from 'app/shared/model/meta-reglement.model';
import { MetaReglementService } from './meta-reglement.service';

@Component({
  templateUrl: './meta-reglement-delete-dialog.component.html'
})
export class MetaReglementDeleteDialogComponent {
  metaReglement?: IMetaReglement;

  constructor(
    protected metaReglementService: MetaReglementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.metaReglementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('metaReglementListModification');
      this.activeModal.close();
    });
  }
}
