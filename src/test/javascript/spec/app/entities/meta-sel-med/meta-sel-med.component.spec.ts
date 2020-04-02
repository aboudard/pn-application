import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaSelMedComponent } from 'app/entities/meta-sel-med/meta-sel-med.component';
import { MetaSelMedService } from 'app/entities/meta-sel-med/meta-sel-med.service';
import { MetaSelMed } from 'app/shared/model/meta-sel-med.model';

describe('Component Tests', () => {
  describe('MetaSelMed Management Component', () => {
    let comp: MetaSelMedComponent;
    let fixture: ComponentFixture<MetaSelMedComponent>;
    let service: MetaSelMedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaSelMedComponent]
      })
        .overrideTemplate(MetaSelMedComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaSelMedComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaSelMedService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MetaSelMed(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.metaSelMeds && comp.metaSelMeds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
