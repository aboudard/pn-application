import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMetaSelMed, MetaSelMed } from 'app/shared/model/meta-sel-med.model';
import { MetaSelMedService } from './meta-sel-med.service';
import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from 'app/entities/demande/demande.service';

@Component({
  selector: 'jhi-meta-sel-med-update',
  templateUrl: './meta-sel-med-update.component.html'
})
export class MetaSelMedUpdateComponent implements OnInit {
  isSaving = false;
  idteches: IDemande[] = [];

  editForm = this.fb.group({
    id: [],
    idTech: [],
    numSous: [],
    numDossier: [],
    nomAssure: [],
    idTech: []
  });

  constructor(
    protected metaSelMedService: MetaSelMedService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaSelMed }) => {
      this.updateForm(metaSelMed);

      this.demandeService
        .query({ filter: 'metaselmed-is-null' })
        .pipe(
          map((res: HttpResponse<IDemande[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDemande[]) => {
          if (!metaSelMed.idTech || !metaSelMed.idTech.id) {
            this.idteches = resBody;
          } else {
            this.demandeService
              .find(metaSelMed.idTech.id)
              .pipe(
                map((subRes: HttpResponse<IDemande>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDemande[]) => (this.idteches = concatRes));
          }
        });
    });
  }

  updateForm(metaSelMed: IMetaSelMed): void {
    this.editForm.patchValue({
      id: metaSelMed.id,
      idTech: metaSelMed.idTech,
      numSous: metaSelMed.numSous,
      numDossier: metaSelMed.numDossier,
      nomAssure: metaSelMed.nomAssure,
      idTech: metaSelMed.idTech
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const metaSelMed = this.createFromForm();
    if (metaSelMed.id !== undefined) {
      this.subscribeToSaveResponse(this.metaSelMedService.update(metaSelMed));
    } else {
      this.subscribeToSaveResponse(this.metaSelMedService.create(metaSelMed));
    }
  }

  private createFromForm(): IMetaSelMed {
    return {
      ...new MetaSelMed(),
      id: this.editForm.get(['id'])!.value,
      idTech: this.editForm.get(['idTech'])!.value,
      numSous: this.editForm.get(['numSous'])!.value,
      numDossier: this.editForm.get(['numDossier'])!.value,
      nomAssure: this.editForm.get(['nomAssure'])!.value,
      idTech: this.editForm.get(['idTech'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetaSelMed>>): void {
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

  trackById(index: number, item: IDemande): any {
    return item.id;
  }
}
