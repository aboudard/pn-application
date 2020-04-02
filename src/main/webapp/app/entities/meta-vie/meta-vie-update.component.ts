import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMetaVie, MetaVie } from 'app/shared/model/meta-vie.model';
import { MetaVieService } from './meta-vie.service';
import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from 'app/entities/demande/demande.service';

@Component({
  selector: 'jhi-meta-vie-update',
  templateUrl: './meta-vie-update.component.html'
})
export class MetaVieUpdateComponent implements OnInit {
  isSaving = false;
  idteches: IDemande[] = [];

  editForm = this.fb.group({
    id: [],
    idTech: [],
    numSous: [],
    numContratVie: [],
    idTech: []
  });

  constructor(
    protected metaVieService: MetaVieService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaVie }) => {
      this.updateForm(metaVie);

      this.demandeService
        .query({ filter: 'metavie-is-null' })
        .pipe(
          map((res: HttpResponse<IDemande[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDemande[]) => {
          if (!metaVie.idTech || !metaVie.idTech.id) {
            this.idteches = resBody;
          } else {
            this.demandeService
              .find(metaVie.idTech.id)
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

  updateForm(metaVie: IMetaVie): void {
    this.editForm.patchValue({
      id: metaVie.id,
      idTech: metaVie.idTech,
      numSous: metaVie.numSous,
      numContratVie: metaVie.numContratVie,
      idTech: metaVie.idTech
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const metaVie = this.createFromForm();
    if (metaVie.id !== undefined) {
      this.subscribeToSaveResponse(this.metaVieService.update(metaVie));
    } else {
      this.subscribeToSaveResponse(this.metaVieService.create(metaVie));
    }
  }

  private createFromForm(): IMetaVie {
    return {
      ...new MetaVie(),
      id: this.editForm.get(['id'])!.value,
      idTech: this.editForm.get(['idTech'])!.value,
      numSous: this.editForm.get(['numSous'])!.value,
      numContratVie: this.editForm.get(['numContratVie'])!.value,
      idTech: this.editForm.get(['idTech'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetaVie>>): void {
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
