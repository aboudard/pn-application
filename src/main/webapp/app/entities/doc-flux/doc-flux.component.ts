import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocFlux } from 'app/shared/model/doc-flux.model';
import { DocFluxService } from './doc-flux.service';
import { DocFluxDeleteDialogComponent } from './doc-flux-delete-dialog.component';

@Component({
  selector: 'jhi-doc-flux',
  templateUrl: './doc-flux.component.html'
})
export class DocFluxComponent implements OnInit, OnDestroy {
  docFluxes?: IDocFlux[];
  eventSubscriber?: Subscription;

  constructor(protected docFluxService: DocFluxService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.docFluxService.query().subscribe((res: HttpResponse<IDocFlux[]>) => (this.docFluxes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDocFluxes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDocFlux): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDocFluxes(): void {
    this.eventSubscriber = this.eventManager.subscribe('docFluxListModification', () => this.loadAll());
  }

  delete(docFlux: IDocFlux): void {
    const modalRef = this.modalService.open(DocFluxDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.docFlux = docFlux;
  }
}
