import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetaSIRH } from 'app/shared/model/meta-sirh.model';

@Component({
  selector: 'jhi-meta-sirh-detail',
  templateUrl: './meta-sirh-detail.component.html'
})
export class MetaSIRHDetailComponent implements OnInit {
  metaSIRH: IMetaSIRH | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaSIRH }) => (this.metaSIRH = metaSIRH));
  }

  previousState(): void {
    window.history.back();
  }
}
