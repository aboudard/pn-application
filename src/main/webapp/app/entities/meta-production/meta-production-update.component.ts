import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMetaProduction, MetaProduction } from 'app/shared/model/meta-production.model';
import { MetaProductionService } from './meta-production.service';
import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from 'app/entities/demande/demande.service';

@Component({
  selector: 'jhi-meta-production-update',
  templateUrl: './meta-production-update.component.html'
})
export class MetaProductionUpdateComponent implements OnInit {
  isSaving = false;
  idteches: IDemande[] = [];

  editForm = this.fb.group({
    id: [],
    idTech: [],
    societe: [],
    numContratLgbt: [],
    numSous: [],
    idTech: []
  });

  constructor(
    protected metaProductionService: MetaProductionService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaProduction }) => {
      this.updateForm(metaProduction);

      this.demandeService
        .query({ filter: 'metaproduction-is-null' })
        .pipe(
          map((res: HttpResponse<IDemande[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDemande[]) => {
          if (!metaProduction.idTech || !metaProduction.idTech.id) {
            this.idteches = resBody;
          } else {
            this.demandeService
              .find(metaProduction.idTech.id)
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

  updateForm(metaProduction: IMetaProduction): void {
    this.editForm.patchValue({
      id: metaProduction.id,
      idTech: metaProduction.idTech,
      societe: metaProduction.societe,
      numContratLgbt: metaProduction.numContratLgbt,
      numSous: metaProduction.numSous,
      idTech: metaProduction.idTech
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const metaProduction = this.createFromForm();
    if (metaProduction.id !== undefined) {
      this.subscribeToSaveResponse(this.metaProductionService.update(metaProduction));
    } else {
      this.subscribeToSaveResponse(this.metaProductionService.create(metaProduction));
    }
  }

  private createFromForm(): IMetaProduction {
    return {
      ...new MetaProduction(),
      id: this.editForm.get(['id'])!.value,
      idTech: this.editForm.get(['idTech'])!.value,
      societe: this.editForm.get(['societe'])!.value,
      numContratLgbt: this.editForm.get(['numContratLgbt'])!.value,
      numSous: this.editForm.get(['numSous'])!.value,
      idTech: this.editForm.get(['idTech'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetaProduction>>): void {
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
