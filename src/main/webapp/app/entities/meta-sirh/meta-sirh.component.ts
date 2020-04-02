import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMetaSIRH } from 'app/shared/model/meta-sirh.model';
import { MetaSIRHService } from './meta-sirh.service';
import { MetaSIRHDeleteDialogComponent } from './meta-sirh-delete-dialog.component';

@Component({
  selector: 'jhi-meta-sirh',
  templateUrl: './meta-sirh.component.html'
})
export class MetaSIRHComponent implements OnInit, OnDestroy {
  metaSIRHS?: IMetaSIRH[];
  eventSubscriber?: Subscription;

  constructor(protected metaSIRHService: MetaSIRHService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.metaSIRHService.query().subscribe((res: HttpResponse<IMetaSIRH[]>) => (this.metaSIRHS = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMetaSIRHS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMetaSIRH): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMetaSIRHS(): void {
    this.eventSubscriber = this.eventManager.subscribe('metaSIRHListModification', () => this.loadAll());
  }

  delete(metaSIRH: IMetaSIRH): void {
    const modalRef = this.modalService.open(MetaSIRHDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.metaSIRH = metaSIRH;
  }
}
