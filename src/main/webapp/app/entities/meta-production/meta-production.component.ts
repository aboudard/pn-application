import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMetaProduction } from 'app/shared/model/meta-production.model';
import { MetaProductionService } from './meta-production.service';
import { MetaProductionDeleteDialogComponent } from './meta-production-delete-dialog.component';

@Component({
  selector: 'jhi-meta-production',
  templateUrl: './meta-production.component.html'
})
export class MetaProductionComponent implements OnInit, OnDestroy {
  metaProductions?: IMetaProduction[];
  eventSubscriber?: Subscription;

  constructor(
    protected metaProductionService: MetaProductionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.metaProductionService.query().subscribe((res: HttpResponse<IMetaProduction[]>) => (this.metaProductions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMetaProductions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMetaProduction): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMetaProductions(): void {
    this.eventSubscriber = this.eventManager.subscribe('metaProductionListModification', () => this.loadAll());
  }

  delete(metaProduction: IMetaProduction): void {
    const modalRef = this.modalService.open(MetaProductionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.metaProduction = metaProduction;
  }
}
