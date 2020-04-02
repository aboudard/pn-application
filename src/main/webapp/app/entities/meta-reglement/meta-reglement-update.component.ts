import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMetaReglement, MetaReglement } from 'app/shared/model/meta-reglement.model';
import { MetaReglementService } from './meta-reglement.service';
import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from 'app/entities/demande/demande.service';

@Component({
  selector: 'jhi-meta-reglement-update',
  templateUrl: './meta-reglement-update.component.html'
})
export class MetaReglementUpdateComponent implements OnInit {
  isSaving = false;
  idteches: IDemande[] = [];

  editForm = this.fb.group({
    id: [],
    idTech: [],
    societe: [],
    numSinistre: [],
    numContratLgbt: [],
    numSous: [],
    idTech: []
  });

  constructor(
    protected metaReglementService: MetaReglementService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaReglement }) => {
      this.updateForm(metaReglement);

      this.demandeService
        .query({ filter: 'metareglement-is-null' })
        .pipe(
          map((res: HttpResponse<IDemande[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDemande[]) => {
          if (!metaReglement.idTech || !metaReglement.idTech.id) {
            this.idteches = resBody;
          } else {
            this.demandeService
              .find(metaReglement.idTech.id)
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

  updateForm(metaReglement: IMetaReglement): void {
    this.editForm.patchValue({
      id: metaReglement.id,
      idTech: metaReglement.idTech,
      societe: metaReglement.societe,
      numSinistre: metaReglement.numSinistre,
      numContratLgbt: metaReglement.numContratLgbt,
      numSous: metaReglement.numSous,
      idTech: metaReglement.idTech
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const metaReglement = this.createFromForm();
    if (metaReglement.id !== undefined) {
      this.subscribeToSaveResponse(this.metaReglementService.update(metaReglement));
    } else {
      this.subscribeToSaveResponse(this.metaReglementService.create(metaReglement));
    }
  }

  private createFromForm(): IMetaReglement {
    return {
      ...new MetaReglement(),
      id: this.editForm.get(['id'])!.value,
      idTech: this.editForm.get(['idTech'])!.value,
      societe: this.editForm.get(['societe'])!.value,
      numSinistre: this.editForm.get(['numSinistre'])!.value,
      numContratLgbt: this.editForm.get(['numContratLgbt'])!.value,
      numSous: this.editForm.get(['numSous'])!.value,
      idTech: this.editForm.get(['idTech'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetaReglement>>): void {
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
