import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaProductionUpdateComponent } from 'app/entities/meta-production/meta-production-update.component';
import { MetaProductionService } from 'app/entities/meta-production/meta-production.service';
import { MetaProduction } from 'app/shared/model/meta-production.model';

describe('Component Tests', () => {
  describe('MetaProduction Management Update Component', () => {
    let comp: MetaProductionUpdateComponent;
    let fixture: ComponentFixture<MetaProductionUpdateComponent>;
    let service: MetaProductionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaProductionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MetaProductionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaProductionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaProductionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MetaProduction(123);
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
        const entity = new MetaProduction();
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
