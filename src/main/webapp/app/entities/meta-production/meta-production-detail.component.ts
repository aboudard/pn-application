import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetaProduction } from 'app/shared/model/meta-production.model';

@Component({
  selector: 'jhi-meta-production-detail',
  templateUrl: './meta-production-detail.component.html'
})
export class MetaProductionDetailComponent implements OnInit {
  metaProduction: IMetaProduction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaProduction }) => (this.metaProduction = metaProduction));
  }

  previousState(): void {
    window.history.back();
  }
}
