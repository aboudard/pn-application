import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetaSIRH } from 'app/shared/model/meta-sirh.model';
import { MetaSIRHService } from './meta-sirh.service';

@Component({
  templateUrl: './meta-sirh-delete-dialog.component.html'
})
export class MetaSIRHDeleteDialogComponent {
  metaSIRH?: IMetaSIRH;

  constructor(protected metaSIRHService: MetaSIRHService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.metaSIRHService.delete(id).subscribe(() => {
      this.eventManager.broadcast('metaSIRHListModification');
      this.activeModal.close();
    });
  }
}
