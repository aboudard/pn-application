import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaVieUpdateComponent } from 'app/entities/meta-vie/meta-vie-update.component';
import { MetaVieService } from 'app/entities/meta-vie/meta-vie.service';
import { MetaVie } from 'app/shared/model/meta-vie.model';

describe('Component Tests', () => {
  describe('MetaVie Management Update Component', () => {
    let comp: MetaVieUpdateComponent;
    let fixture: ComponentFixture<MetaVieUpdateComponent>;
    let service: MetaVieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaVieUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MetaVieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaVieUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaVieService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MetaVie(123);
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
        const entity = new MetaVie();
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
