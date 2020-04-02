import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaCoherisUpdateComponent } from 'app/entities/meta-coheris/meta-coheris-update.component';
import { MetaCoherisService } from 'app/entities/meta-coheris/meta-coheris.service';
import { MetaCoheris } from 'app/shared/model/meta-coheris.model';

describe('Component Tests', () => {
  describe('MetaCoheris Management Update Component', () => {
    let comp: MetaCoherisUpdateComponent;
    let fixture: ComponentFixture<MetaCoherisUpdateComponent>;
    let service: MetaCoherisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaCoherisUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MetaCoherisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaCoherisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaCoherisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MetaCoheris(123);
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
        const entity = new MetaCoheris();
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
