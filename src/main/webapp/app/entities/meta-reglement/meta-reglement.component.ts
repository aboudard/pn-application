import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMetaReglement } from 'app/shared/model/meta-reglement.model';
import { MetaReglementService } from './meta-reglement.service';
import { MetaReglementDeleteDialogComponent } from './meta-reglement-delete-dialog.component';

@Component({
  selector: 'jhi-meta-reglement',
  templateUrl: './meta-reglement.component.html'
})
export class MetaReglementComponent implements OnInit, OnDestroy {
  metaReglements?: IMetaReglement[];
  eventSubscriber?: Subscription;

  constructor(
    protected metaReglementService: MetaReglementService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.metaReglementService.query().subscribe((res: HttpResponse<IMetaReglement[]>) => (this.metaReglements = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMetaReglements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMetaReglement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMetaReglements(): void {
    this.eventSubscriber = this.eventManager.subscribe('metaReglementListModification', () => this.loadAll());
  }

  delete(metaReglement: IMetaReglement): void {
    const modalRef = this.modalService.open(MetaReglementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.metaReglement = metaReglement;
  }
}
