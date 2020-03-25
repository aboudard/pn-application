import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { DocFluxComponent } from 'app/entities/doc-flux/doc-flux.component';
import { DocFluxService } from 'app/entities/doc-flux/doc-flux.service';
import { DocFlux } from 'app/shared/model/doc-flux.model';

describe('Component Tests', () => {
  describe('DocFlux Management Component', () => {
    let comp: DocFluxComponent;
    let fixture: ComponentFixture<DocFluxComponent>;
    let service: DocFluxService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [DocFluxComponent]
      })
        .overrideTemplate(DocFluxComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocFluxComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocFluxService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DocFlux(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.docFluxes && comp.docFluxes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
