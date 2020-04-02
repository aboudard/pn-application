import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMetaRecouvrement } from 'app/shared/model/meta-recouvrement.model';
import { MetaRecouvrementService } from './meta-recouvrement.service';
import { MetaRecouvrementDeleteDialogComponent } from './meta-recouvrement-delete-dialog.component';

@Component({
  selector: 'jhi-meta-recouvrement',
  templateUrl: './meta-recouvrement.component.html'
})
export class MetaRecouvrementComponent implements OnInit, OnDestroy {
  metaRecouvrements?: IMetaRecouvrement[];
  eventSubscriber?: Subscription;

  constructor(
    protected metaRecouvrementService: MetaRecouvrementService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.metaRecouvrementService.query().subscribe((res: HttpResponse<IMetaRecouvrement[]>) => (this.metaRecouvrements = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMetaRecouvrements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMetaRecouvrement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMetaRecouvrements(): void {
    this.eventSubscriber = this.eventManager.subscribe('metaRecouvrementListModification', () => this.loadAll());
  }

  delete(metaRecouvrement: IMetaRecouvrement): void {
    const modalRef = this.modalService.open(MetaRecouvrementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.metaRecouvrement = metaRecouvrement;
  }
}
