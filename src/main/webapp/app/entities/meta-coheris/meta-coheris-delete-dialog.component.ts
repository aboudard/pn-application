import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetaCoheris } from 'app/shared/model/meta-coheris.model';
import { MetaCoherisService } from './meta-coheris.service';

@Component({
  templateUrl: './meta-coheris-delete-dialog.component.html'
})
export class MetaCoherisDeleteDialogComponent {
  metaCoheris?: IMetaCoheris;

  constructor(
    protected metaCoherisService: MetaCoherisService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.metaCoherisService.delete(id).subscribe(() => {
      this.eventManager.broadcast('metaCoherisListModification');
      this.activeModal.close();
    });
  }
}
