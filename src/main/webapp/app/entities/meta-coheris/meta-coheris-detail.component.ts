import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetaCoheris } from 'app/shared/model/meta-coheris.model';

@Component({
  selector: 'jhi-meta-coheris-detail',
  templateUrl: './meta-coheris-detail.component.html'
})
export class MetaCoherisDetailComponent implements OnInit {
  metaCoheris: IMetaCoheris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaCoheris }) => (this.metaCoheris = metaCoheris));
  }

  previousState(): void {
    window.history.back();
  }
}
