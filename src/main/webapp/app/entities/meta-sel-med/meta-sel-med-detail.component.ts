import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetaSelMed } from 'app/shared/model/meta-sel-med.model';

@Component({
  selector: 'jhi-meta-sel-med-detail',
  templateUrl: './meta-sel-med-detail.component.html'
})
export class MetaSelMedDetailComponent implements OnInit {
  metaSelMed: IMetaSelMed | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaSelMed }) => (this.metaSelMed = metaSelMed));
  }

  previousState(): void {
    window.history.back();
  }
}
