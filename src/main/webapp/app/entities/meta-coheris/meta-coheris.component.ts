import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMetaCoheris } from 'app/shared/model/meta-coheris.model';
import { MetaCoherisService } from './meta-coheris.service';
import { MetaCoherisDeleteDialogComponent } from './meta-coheris-delete-dialog.component';

@Component({
  selector: 'jhi-meta-coheris',
  templateUrl: './meta-coheris.component.html'
})
export class MetaCoherisComponent implements OnInit, OnDestroy {
  metaCoherises?: IMetaCoheris[];
  eventSubscriber?: Subscription;

  constructor(
    protected metaCoherisService: MetaCoherisService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.metaCoherisService.query().subscribe((res: HttpResponse<IMetaCoheris[]>) => (this.metaCoherises = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMetaCoherises();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMetaCoheris): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMetaCoherises(): void {
    this.eventSubscriber = this.eventManager.subscribe('metaCoherisListModification', () => this.loadAll());
  }

  delete(metaCoheris: IMetaCoheris): void {
    const modalRef = this.modalService.open(MetaCoherisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.metaCoheris = metaCoheris;
  }
}
