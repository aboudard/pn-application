import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from './demande.service';
import { DemandeDeleteDialogComponent } from './demande-delete-dialog.component';

@Component({
  selector: 'jhi-demande',
  templateUrl: './demande.component.html'
})
export class DemandeComponent implements OnInit, OnDestroy {
  demandes?: IDemande[];
  eventSubscriber?: Subscription;

  constructor(
    protected demandeService: DemandeService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.demandeService.query().subscribe((res: HttpResponse<IDemande[]>) => (this.demandes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDemandes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDemande): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInDemandes(): void {
    this.eventSubscriber = this.eventManager.subscribe('demandeListModification', () => this.loadAll());
  }

  delete(demande: IDemande): void {
    const modalRef = this.modalService.open(DemandeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.demande = demande;
  }
}
