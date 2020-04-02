import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMetaRecouvrement, MetaRecouvrement } from 'app/shared/model/meta-recouvrement.model';
import { MetaRecouvrementService } from './meta-recouvrement.service';
import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from 'app/entities/demande/demande.service';

@Component({
  selector: 'jhi-meta-recouvrement-update',
  templateUrl: './meta-recouvrement-update.component.html'
})
export class MetaRecouvrementUpdateComponent implements OnInit {
  isSaving = false;
  idteches: IDemande[] = [];

  editForm = this.fb.group({
    id: [],
    idTech: [],
    societe: [],
    numSous: [],
    idTech: []
  });

  constructor(
    protected metaRecouvrementService: MetaRecouvrementService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metaRecouvrement }) => {
      this.updateForm(metaRecouvrement);

      this.demandeService
        .query({ filter: 'metarecouvrement-is-null' })
        .pipe(
          map((res: HttpResponse<IDemande[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDemande[]) => {
          if (!metaRecouvrement.idTech || !metaRecouvrement.idTech.id) {
            this.idteches = resBody;
          } else {
            this.demandeService
              .find(metaRecouvrement.idTech.id)
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

  updateForm(metaRecouvrement: IMetaRecouvrement): void {
    this.editForm.patchValue({
      id: metaRecouvrement.id,
      idTech: metaRecouvrement.idTech,
      societe: metaRecouvrement.societe,
      numSous: metaRecouvrement.numSous,
      idTech: metaRecouvrement.idTech
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const metaRecouvrement = this.createFromForm();
    if (metaRecouvrement.id !== undefined) {
      this.subscribeToSaveResponse(this.metaRecouvrementService.update(metaRecouvrement));
    } else {
      this.subscribeToSaveResponse(this.metaRecouvrementService.create(metaRecouvrement));
    }
  }

  private createFromForm(): IMetaRecouvrement {
    return {
      ...new MetaRecouvrement(),
      id: this.editForm.get(['id'])!.value,
      idTech: this.editForm.get(['idTech'])!.value,
      societe: this.editForm.get(['societe'])!.value,
      numSous: this.editForm.get(['numSous'])!.value,
      idTech: this.editForm.get(['idTech'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetaRecouvrement>>): void {
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
