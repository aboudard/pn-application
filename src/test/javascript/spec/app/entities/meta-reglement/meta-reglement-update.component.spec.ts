import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaReglementUpdateComponent } from 'app/entities/meta-reglement/meta-reglement-update.component';
import { MetaReglementService } from 'app/entities/meta-reglement/meta-reglement.service';
import { MetaReglement } from 'app/shared/model/meta-reglement.model';

describe('Component Tests', () => {
  describe('MetaReglement Management Update Component', () => {
    let comp: MetaReglementUpdateComponent;
    let fixture: ComponentFixture<MetaReglementUpdateComponent>;
    let service: MetaReglementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaReglementUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MetaReglementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaReglementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaReglementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MetaReglement(123);
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
        const entity = new MetaReglement();
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
