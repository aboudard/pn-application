import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IDemande, Demande } from 'app/shared/model/demande.model';
import { DemandeService } from './demande.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-demande-update',
  templateUrl: './demande-update.component.html'
})
export class DemandeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idTech: [null, [Validators.required]],
    domaine: [],
    idDemande: [],
    badge: [],
    dateDemande: [],
    statut: [],
    flux: [],
    fluxContentType: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demande }) => {
      if (!demande.id) {
        const today = moment().startOf('day');
        demande.dateDemande = today;
      }

      this.updateForm(demande);
    });
  }

  updateForm(demande: IDemande): void {
    this.editForm.patchValue({
      id: demande.id,
      idTech: demande.idTech,
      domaine: demande.domaine,
      idDemande: demande.idDemande,
      badge: demande.badge,
      dateDemande: demande.dateDemande ? demande.dateDemande.format(DATE_TIME_FORMAT) : null,
      statut: demande.statut,
      flux: demande.flux,
      fluxContentType: demande.fluxContentType
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('pnApplicationApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demande = this.createFromForm();
    if (demande.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeService.update(demande));
    } else {
      this.subscribeToSaveResponse(this.demandeService.create(demande));
    }
  }

  private createFromForm(): IDemande {
    return {
      ...new Demande(),
      id: this.editForm.get(['id'])!.value,
      idTech: this.editForm.get(['idTech'])!.value,
      domaine: this.editForm.get(['domaine'])!.value,
      idDemande: this.editForm.get(['idDemande'])!.value,
      badge: this.editForm.get(['badge'])!.value,
      dateDemande: this.editForm.get(['dateDemande'])!.value
        ? moment(this.editForm.get(['dateDemande'])!.value, DATE_TIME_FORMAT)
        : undefined,
      statut: this.editForm.get(['statut'])!.value,
      fluxContentType: this.editForm.get(['fluxContentType'])!.value,
      flux: this.editForm.get(['flux'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemande>>): void {
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
