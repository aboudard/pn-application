import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMetaSIRH, MetaSIRH } from 'app/shared/model/meta-sirh.model';
import { MetaSIRHService } from './meta-sirh.service';
import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from 'app/entities/demande/demande.service';

@Component({
  selector: 'jhi-meta-sirh-update',
  templateUrl: './meta-sirh-update.component.html'
})
export class MetaSIRHUpdateComponent implements OnInit {
  isSaving = false;
  idteches: IDemande[] = [];

  editForm = this.fb.group({
    id: [],
    idTech: [],
    numBadge: [],
    numBadgeDest: [],
    nomCollab: [],
    prenomCollab: [],
    codeUO: [],
    idTech: []
  });

  constructor(
    protected metaSIRHService: MetaSIRHService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaSIRH }) => {
      this.updateForm(metaSIRH);

      this.demandeService
        .query({ filter: 'metasirh-is-null' })
        .pipe(
          map((res: HttpResponse<IDemande[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDemande[]) => {
          if (!metaSIRH.idTech || !metaSIRH.idTech.id) {
            this.idteches = resBody;
          } else {
            this.demandeService
              .find(metaSIRH.idTech.id)
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

  updateForm(metaSIRH: IMetaSIRH): void {
    this.editForm.patchValue({
      id: metaSIRH.id,
      idTech: metaSIRH.idTech,
      numBadge: metaSIRH.numBadge,
      numBadgeDest: metaSIRH.numBadgeDest,
      nomCollab: metaSIRH.nomCollab,
      prenomCollab: metaSIRH.prenomCollab,
      codeUO: metaSIRH.codeUO,
      idTech: metaSIRH.idTech
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const metaSIRH = this.createFromForm();
    if (metaSIRH.id !== undefined) {
      this.subscribeToSaveResponse(this.metaSIRHService.update(metaSIRH));
    } else {
      this.subscribeToSaveResponse(this.metaSIRHService.create(metaSIRH));
    }
  }

  private createFromForm(): IMetaSIRH {
    return {
      ...new MetaSIRH(),
      id: this.editForm.get(['id'])!.value,
      idTech: this.editForm.get(['idTech'])!.value,
      numBadge: this.editForm.get(['numBadge'])!.value,
      numBadgeDest: this.editForm.get(['numBadgeDest'])!.value,
      nomCollab: this.editForm.get(['nomCollab'])!.value,
      prenomCollab: this.editForm.get(['prenomCollab'])!.value,
      codeUO: this.editForm.get(['codeUO'])!.value,
      idTech: this.editForm.get(['idTech'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetaSIRH>>): void {
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
