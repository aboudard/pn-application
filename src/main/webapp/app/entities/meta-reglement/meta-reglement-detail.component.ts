import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetaReglement } from 'app/shared/model/meta-reglement.model';

@Component({
  selector: 'jhi-meta-reglement-detail',
  templateUrl: './meta-reglement-detail.component.html'
})
export class MetaReglementDetailComponent implements OnInit {
  metaReglement: IMetaReglement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaReglement }) => (this.metaReglement = metaReglement));
  }

  previousState(): void {
    window.history.back();
  }
}
