import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAudit } from 'app/shared/model/audit.model';
import { AuditService } from './audit.service';
import { AuditDeleteDialogComponent } from './audit-delete-dialog.component';

@Component({
  selector: 'jhi-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit, OnDestroy {
  audits?: IAudit[];
  eventSubscriber?: Subscription;

  constructor(protected auditService: AuditService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.auditService.query().subscribe((res: HttpResponse<IAudit[]>) => (this.audits = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAudits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAudit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAudits(): void {
    this.eventSubscriber = this.eventManager.subscribe('auditListModification', () => this.loadAll());
  }

  delete(audit: IAudit): void {
    const modalRef = this.modalService.open(AuditDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.audit = audit;
  }
}
