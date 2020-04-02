import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaRecouvrementUpdateComponent } from 'app/entities/meta-recouvrement/meta-recouvrement-update.component';
import { MetaRecouvrementService } from 'app/entities/meta-recouvrement/meta-recouvrement.service';
import { MetaRecouvrement } from 'app/shared/model/meta-recouvrement.model';

describe('Component Tests', () => {
  describe('MetaRecouvrement Management Update Component', () => {
    let comp: MetaRecouvrementUpdateComponent;
    let fixture: ComponentFixture<MetaRecouvrementUpdateComponent>;
    let service: MetaRecouvrementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaRecouvrementUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MetaRecouvrementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaRecouvrementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaRecouvrementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MetaRecouvrement(123);
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
        const entity = new MetaRecouvrement();
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
