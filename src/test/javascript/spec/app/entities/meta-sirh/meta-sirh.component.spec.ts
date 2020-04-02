import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaSIRHComponent } from 'app/entities/meta-sirh/meta-sirh.component';
import { MetaSIRHService } from 'app/entities/meta-sirh/meta-sirh.service';
import { MetaSIRH } from 'app/shared/model/meta-sirh.model';

describe('Component Tests', () => {
  describe('MetaSIRH Management Component', () => {
    let comp: MetaSIRHComponent;
    let fixture: ComponentFixture<MetaSIRHComponent>;
    let service: MetaSIRHService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaSIRHComponent]
      })
        .overrideTemplate(MetaSIRHComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaSIRHComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaSIRHService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MetaSIRH(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.metaSIRHS && comp.metaSIRHS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
