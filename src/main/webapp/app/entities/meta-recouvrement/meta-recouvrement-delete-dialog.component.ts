import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetaRecouvrement } from 'app/shared/model/meta-recouvrement.model';
import { MetaRecouvrementService } from './meta-recouvrement.service';

@Component({
  templateUrl: './meta-recouvrement-delete-dialog.component.html'
})
export class MetaRecouvrementDeleteDialogComponent {
  metaRecouvrement?: IMetaRecouvrement;

  constructor(
    protected metaRecouvrementService: MetaRecouvrementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.metaRecouvrementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('metaRecouvrementListModification');
      this.activeModal.close();
    });
  }
}
