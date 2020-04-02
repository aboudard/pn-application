import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaReglementComponent } from 'app/entities/meta-reglement/meta-reglement.component';
import { MetaReglementService } from 'app/entities/meta-reglement/meta-reglement.service';
import { MetaReglement } from 'app/shared/model/meta-reglement.model';

describe('Component Tests', () => {
  describe('MetaReglement Management Component', () => {
    let comp: MetaReglementComponent;
    let fixture: ComponentFixture<MetaReglementComponent>;
    let service: MetaReglementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaReglementComponent]
      })
        .overrideTemplate(MetaReglementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaReglementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaReglementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MetaReglement(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.metaReglements && comp.metaReglements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
