import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetaVie } from 'app/shared/model/meta-vie.model';

@Component({
  selector: 'jhi-meta-vie-detail',
  templateUrl: './meta-vie-detail.component.html'
})
export class MetaVieDetailComponent implements OnInit {
  metaVie: IMetaVie | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaVie }) => (this.metaVie = metaVie));
  }

  previousState(): void {
    window.history.back();
  }
}
