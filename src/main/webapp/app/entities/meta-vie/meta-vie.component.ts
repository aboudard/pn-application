import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMetaVie } from 'app/shared/model/meta-vie.model';
import { MetaVieService } from './meta-vie.service';
import { MetaVieDeleteDialogComponent } from './meta-vie-delete-dialog.component';

@Component({
  selector: 'jhi-meta-vie',
  templateUrl: './meta-vie.component.html'
})
export class MetaVieComponent implements OnInit, OnDestroy {
  metaVies?: IMetaVie[];
  eventSubscriber?: Subscription;

  constructor(protected metaVieService: MetaVieService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.metaVieService.query().subscribe((res: HttpResponse<IMetaVie[]>) => (this.metaVies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMetaVies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMetaVie): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMetaVies(): void {
    this.eventSubscriber = this.eventManager.subscribe('metaVieListModification', () => this.loadAll());
  }

  delete(metaVie: IMetaVie): void {
    const modalRef = this.modalService.open(MetaVieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.metaVie = metaVie;
  }
}
