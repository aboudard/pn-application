import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetaRecouvrement } from 'app/shared/model/meta-recouvrement.model';

@Component({
  selector: 'jhi-meta-recouvrement-detail',
  templateUrl: './meta-recouvrement-detail.component.html'
})
export class MetaRecouvrementDetailComponent implements OnInit {
  metaRecouvrement: IMetaRecouvrement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaRecouvrement }) => (this.metaRecouvrement = metaRecouvrement));
  }

  previousState(): void {
    window.history.back();
  }
}
