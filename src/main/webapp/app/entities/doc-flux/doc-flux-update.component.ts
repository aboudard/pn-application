import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDocFlux, DocFlux } from 'app/shared/model/doc-flux.model';
import { DocFluxService } from './doc-flux.service';
import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from 'app/entities/demande/demande.service';

@Component({
  selector: 'jhi-doc-flux-update',
  templateUrl: './doc-flux-update.component.html'
})
export class DocFluxUpdateComponent implements OnInit {
  isSaving = false;
  demandes: IDemande[] = [];

  editForm = this.fb.group({
    id: [],
    idEdition: [],
    libelle: [],
    modele: [],
    famille: [],
    version: [],
    idEditions: []
  });

  constructor(
    protected docFluxService: DocFluxService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ docFlux }) => {
      this.updateForm(docFlux);

      this.demandeService.query().subscribe((res: HttpResponse<IDemande[]>) => (this.demandes = res.body || []));
    });
  }

  updateForm(docFlux: IDocFlux): void {
    this.editForm.patchValue({
      id: docFlux.id,
      idEdition: docFlux.idEdition,
      libelle: docFlux.libelle,
      modele: docFlux.modele,
      famille: docFlux.famille,
      version: docFlux.version,
      idEditions: docFlux.idEditions
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const docFlux = this.createFromForm();
    if (docFlux.id !== undefined) {
      this.subscribeToSaveResponse(this.docFluxService.update(docFlux));
    } else {
      this.subscribeToSaveResponse(this.docFluxService.create(docFlux));
    }
  }

  private createFromForm(): IDocFlux {
    return {
      ...new DocFlux(),
      id: this.editForm.get(['id'])!.value,
      idEdition: this.editForm.get(['idEdition'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      modele: this.editForm.get(['modele'])!.value,
      famille: this.editForm.get(['famille'])!.value,
      version: this.editForm.get(['version'])!.value,
      idEditions: this.editForm.get(['idEditions'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocFlux>>): void {
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

  getSelected(selectedVals: IDemande[], option: IDemande): IDemande {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
