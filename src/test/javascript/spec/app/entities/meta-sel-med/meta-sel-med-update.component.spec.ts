import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaSelMedUpdateComponent } from 'app/entities/meta-sel-med/meta-sel-med-update.component';
import { MetaSelMedService } from 'app/entities/meta-sel-med/meta-sel-med.service';
import { MetaSelMed } from 'app/shared/model/meta-sel-med.model';

describe('Component Tests', () => {
  describe('MetaSelMed Management Update Component', () => {
    let comp: MetaSelMedUpdateComponent;
    let fixture: ComponentFixture<MetaSelMedUpdateComponent>;
    let service: MetaSelMedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaSelMedUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MetaSelMedUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaSelMedUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaSelMedService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MetaSelMed(123);
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
        const entity = new MetaSelMed();
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
