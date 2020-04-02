import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParamDemande } from 'app/shared/model/param-demande.model';
import { ParamDemandeService } from './param-demande.service';

@Component({
  templateUrl: './param-demande-delete-dialog.component.html'
})
export class ParamDemandeDeleteDialogComponent {
  paramDemande?: IParamDemande;

  constructor(
    protected paramDemandeService: ParamDemandeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paramDemandeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paramDemandeListModification');
      this.activeModal.close();
    });
  }
}
