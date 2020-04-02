import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { ParamDemandeUpdateComponent } from 'app/entities/param-demande/param-demande-update.component';
import { ParamDemandeService } from 'app/entities/param-demande/param-demande.service';
import { ParamDemande } from 'app/shared/model/param-demande.model';

describe('Component Tests', () => {
  describe('ParamDemande Management Update Component', () => {
    let comp: ParamDemandeUpdateComponent;
    let fixture: ComponentFixture<ParamDemandeUpdateComponent>;
    let service: ParamDemandeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [ParamDemandeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParamDemandeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamDemandeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamDemandeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParamDemande(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParamDemande();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
