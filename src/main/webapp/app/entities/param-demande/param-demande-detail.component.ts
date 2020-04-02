import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParamDemande } from 'app/shared/model/param-demande.model';

@Component({
  selector: 'jhi-param-demande-detail',
  templateUrl: './param-demande-detail.component.html'
})
export class ParamDemandeDetailComponent implements OnInit {
  paramDemande: IParamDemande | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paramDemande }) => (this.paramDemande = paramDemande));
  }

  previousState(): void {
    window.history.back();
  }
}
