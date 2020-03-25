import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaProductionComponent } from 'app/entities/meta-production/meta-production.component';
import { MetaProductionService } from 'app/entities/meta-production/meta-production.service';
import { MetaProduction } from 'app/shared/model/meta-production.model';

describe('Component Tests', () => {
  describe('MetaProduction Management Component', () => {
    let comp: MetaProductionComponent;
    let fixture: ComponentFixture<MetaProductionComponent>;
    let service: MetaProductionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaProductionComponent]
      })
        .overrideTemplate(MetaProductionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaProductionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaProductionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MetaProduction(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.metaProductions && comp.metaProductions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
