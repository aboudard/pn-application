import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IParamDemande, ParamDemande } from 'app/shared/model/param-demande.model';
import { ParamDemandeService } from './param-demande.service';

@Component({
  selector: 'jhi-param-demande-update',
  templateUrl: './param-demande-update.component.html'
})
export class ParamDemandeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idDemande: [],
    fgcle: [],
    nomDataLoader: [],
    versionDataLoader: [],
    nomModele: [],
    idModele: [],
    versionModele: [],
    impression: [],
    archivage: [],
    interactive: [],
    stockage: [],
    hostCol: [],
    impCentr: [],
    instCol: [],
    impHCentr: [],
    lotCont: [],
    dest: [],
    triRegrouptBann: [],
    regles: [],
    conditionnement: [],
    periodicite: [],
    flagMail: [],
    description: [],
    versionMo: [],
    queuesEaiIn: [],
    queuesEaiOut: [],
    libre2: [],
    libre4: []
  });

  constructor(protected paramDemandeService: ParamDemandeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paramDemande }) => {
      this.updateForm(paramDemande);
    });
  }

  updateForm(paramDemande: IParamDemande): void {
    this.editForm.patchValue({
      id: paramDemande.id,
      idDemande: paramDemande.idDemande,
      fgcle: paramDemande.fgcle,
      nomDataLoader: paramDemande.nomDataLoader,
      versionDataLoader: paramDemande.versionDataLoader,
      nomModele: paramDemande.nomModele,
      idModele: paramDemande.idModele,
      versionModele: paramDemande.versionModele,
      impression: paramDemande.impression,
      archivage: paramDemande.archivage,
      interactive: paramDemande.interactive,
      stockage: paramDemande.stockage,
      hostCol: paramDemande.hostCol,
      impCentr: paramDemande.impCentr,
      instCol: paramDemande.instCol,
      impHCentr: paramDemande.impHCentr,
      lotCont: paramDemande.lotCont,
      dest: paramDemande.dest,
      triRegrouptBann: paramDemande.triRegrouptBann,
      regles: paramDemande.regles,
      conditionnement: paramDemande.conditionnement,
      periodicite: paramDemande.periodicite,
      flagMail: paramDemande.flagMail,
      description: paramDemande.description,
      versionMo: paramDemande.versionMo,
      queuesEaiIn: paramDemande.queuesEaiIn,
      queuesEaiOut: paramDemande.queuesEaiOut,
      libre2: paramDemande.libre2,
      libre4: paramDemande.libre4
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paramDemande = this.createFromForm();
    if (paramDemande.id !== undefined) {
      this.subscribeToSaveResponse(this.paramDemandeService.update(paramDemande));
    } else {
      this.subscribeToSaveResponse(this.paramDemandeService.create(paramDemande));
    }
  }

  private createFromForm(): IParamDemande {
    return {
      ...new ParamDemande(),
      id: this.editForm.get(['id'])!.value,
      idDemande: this.editForm.get(['idDemande'])!.value,
      fgcle: this.editForm.get(['fgcle'])!.value,
      nomDataLoader: this.editForm.get(['nomDataLoader'])!.value,
      versionDataLoader: this.editForm.get(['versionDataLoader'])!.value,
      nomModele: this.editForm.get(['nomModele'])!.value,
      idModele: this.editForm.get(['idModele'])!.value,
      versionModele: this.editForm.get(['versionModele'])!.value,
      impression: this.editForm.get(['impression'])!.value,
      archivage: this.editForm.get(['archivage'])!.value,
      interactive: this.editForm.get(['interactive'])!.value,
      stockage: this.editForm.get(['stockage'])!.value,
      hostCol: this.editForm.get(['hostCol'])!.value,
      impCentr: this.editForm.get(['impCentr'])!.value,
      instCol: this.editForm.get(['instCol'])!.value,
      impHCentr: this.editForm.get(['impHCentr'])!.value,
      lotCont: this.editForm.get(['lotCont'])!.value,
      dest: this.editForm.get(['dest'])!.value,
      triRegrouptBann: this.editForm.get(['triRegrouptBann'])!.value,
      regles: this.editForm.get(['regles'])!.value,
      conditionnement: this.editForm.get(['conditionnement'])!.value,
      periodicite: this.editForm.get(['periodicite'])!.value,
      flagMail: this.editForm.get(['flagMail'])!.value,
      description: this.editForm.get(['description'])!.value,
      versionMo: this.editForm.get(['versionMo'])!.value,
      queuesEaiIn: this.editForm.get(['queuesEaiIn'])!.value,
      queuesEaiOut: this.editForm.get(['queuesEaiOut'])!.value,
      libre2: this.editForm.get(['libre2'])!.value,
      libre4: this.editForm.get(['libre4'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParamDemande>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
