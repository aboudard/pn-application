import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParamDemande } from 'app/shared/model/param-demande.model';
import { ParamDemandeService } from './param-demande.service';
import { ParamDemandeDeleteDialogComponent } from './param-demande-delete-dialog.component';

@Component({
  selector: 'jhi-param-demande',
  templateUrl: './param-demande.component.html'
})
export class ParamDemandeComponent implements OnInit, OnDestroy {
  paramDemandes?: IParamDemande[];
  eventSubscriber?: Subscription;

  constructor(
    protected paramDemandeService: ParamDemandeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.paramDemandeService.query().subscribe((res: HttpResponse<IParamDemande[]>) => (this.paramDemandes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInParamDemandes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IParamDemande): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInParamDemandes(): void {
    this.eventSubscriber = this.eventManager.subscribe('paramDemandeListModification', () => this.loadAll());
  }

  delete(paramDemande: IParamDemande): void {
    const modalRef = this.modalService.open(ParamDemandeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paramDemande = paramDemande;
  }
}
