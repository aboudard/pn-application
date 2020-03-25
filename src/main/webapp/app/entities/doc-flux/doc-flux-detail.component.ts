import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocFlux } from 'app/shared/model/doc-flux.model';

@Component({
  selector: 'jhi-doc-flux-detail',
  templateUrl: './doc-flux-detail.component.html'
})
export class DocFluxDetailComponent implements OnInit {
  docFlux: IDocFlux | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ docFlux }) => (this.docFlux = docFlux));
  }

  previousState(): void {
    window.history.back();
  }
}
