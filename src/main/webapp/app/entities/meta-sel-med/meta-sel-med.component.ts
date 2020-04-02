import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMetaSelMed } from 'app/shared/model/meta-sel-med.model';
import { MetaSelMedService } from './meta-sel-med.service';
import { MetaSelMedDeleteDialogComponent } from './meta-sel-med-delete-dialog.component';

@Component({
  selector: 'jhi-meta-sel-med',
  templateUrl: './meta-sel-med.component.html'
})
export class MetaSelMedComponent implements OnInit, OnDestroy {
  metaSelMeds?: IMetaSelMed[];
  eventSubscriber?: Subscription;

  constructor(protected metaSelMedService: MetaSelMedService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.metaSelMedService.query().subscribe((res: HttpResponse<IMetaSelMed[]>) => (this.metaSelMeds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMetaSelMeds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMetaSelMed): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMetaSelMeds(): void {
    this.eventSubscriber = this.eventManager.subscribe('metaSelMedListModification', () => this.loadAll());
  }

  delete(metaSelMed: IMetaSelMed): void {
    const modalRef = this.modalService.open(MetaSelMedDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.metaSelMed = metaSelMed;
  }
}
