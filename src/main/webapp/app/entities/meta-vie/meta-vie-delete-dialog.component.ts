import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetaVie } from 'app/shared/model/meta-vie.model';
import { MetaVieService } from './meta-vie.service';

@Component({
  templateUrl: './meta-vie-delete-dialog.component.html'
})
export class MetaVieDeleteDialogComponent {
  metaVie?: IMetaVie;

  constructor(protected metaVieService: MetaVieService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.metaVieService.delete(id).subscribe(() => {
      this.eventManager.broadcast('metaVieListModification');
      this.activeModal.close();
    });
  }
}
