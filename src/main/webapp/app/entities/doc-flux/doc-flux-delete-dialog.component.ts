import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocFlux } from 'app/shared/model/doc-flux.model';
import { DocFluxService } from './doc-flux.service';

@Component({
  templateUrl: './doc-flux-delete-dialog.component.html'
})
export class DocFluxDeleteDialogComponent {
  docFlux?: IDocFlux;

  constructor(protected docFluxService: DocFluxService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.docFluxService.delete(id).subscribe(() => {
      this.eventManager.broadcast('docFluxListModification');
      this.activeModal.close();
    });
  }
}
