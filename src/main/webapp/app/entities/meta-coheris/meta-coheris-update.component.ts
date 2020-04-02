import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMetaCoheris, MetaCoheris } from 'app/shared/model/meta-coheris.model';
import { MetaCoherisService } from './meta-coheris.service';
import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from 'app/entities/demande/demande.service';

@Component({
  selector: 'jhi-meta-coheris-update',
  templateUrl: './meta-coheris-update.component.html'
})
export class MetaCoherisUpdateComponent implements OnInit {
  isSaving = false;
  idteches: IDemande[] = [];

  editForm = this.fb.group({
    id: [],
    idTech: [],
    societe: [],
    numSous: [],
    numGRC: [],
    idTech: []
  });

  constructor(
    protected metaCoherisService: MetaCoherisService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaCoheris }) => {
      this.updateForm(metaCoheris);

      this.demandeService
        .query({ filter: 'metacoheris-is-null' })
        .pipe(
          map((res: HttpResponse<IDemande[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDemande[]) => {
          if (!metaCoheris.idTech || !metaCoheris.idTech.id) {
            this.idteches = resBody;
          } else {
            this.demandeService
              .find(metaCoheris.idTech.id)
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

  updateForm(metaCoheris: IMetaCoheris): void {
    this.editForm.patchValue({
      id: metaCoheris.id,
      idTech: metaCoheris.idTech,
      societe: metaCoheris.societe,
      numSous: metaCoheris.numSous,
      numGRC: metaCoheris.numGRC,
      idTech: metaCoheris.idTech
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const metaCoheris = this.createFromForm();
    if (metaCoheris.id !== undefined) {
      this.subscribeToSaveResponse(this.metaCoherisService.update(metaCoheris));
    } else {
      this.subscribeToSaveResponse(this.metaCoherisService.create(metaCoheris));
    }
  }

  private createFromForm(): IMetaCoheris {
    return {
      ...new MetaCoheris(),
      id: this.editForm.get(['id'])!.value,
      idTech: this.editForm.get(['idTech'])!.value,
      societe: this.editForm.get(['societe'])!.value,
      numSous: this.editForm.get(['numSous'])!.value,
      numGRC: this.editForm.get(['numGRC'])!.value,
      idTech: this.editForm.get(['idTech'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetaCoheris>>): void {
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
