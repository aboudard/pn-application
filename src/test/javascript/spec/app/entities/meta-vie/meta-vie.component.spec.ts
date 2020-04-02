import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaVieComponent } from 'app/entities/meta-vie/meta-vie.component';
import { MetaVieService } from 'app/entities/meta-vie/meta-vie.service';
import { MetaVie } from 'app/shared/model/meta-vie.model';

describe('Component Tests', () => {
  describe('MetaVie Management Component', () => {
    let comp: MetaVieComponent;
    let fixture: ComponentFixture<MetaVieComponent>;
    let service: MetaVieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaVieComponent]
      })
        .overrideTemplate(MetaVieComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaVieComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaVieService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MetaVie(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.metaVies && comp.metaVies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
