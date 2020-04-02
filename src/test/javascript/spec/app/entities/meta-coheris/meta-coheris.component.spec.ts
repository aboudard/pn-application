import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaCoherisComponent } from 'app/entities/meta-coheris/meta-coheris.component';
import { MetaCoherisService } from 'app/entities/meta-coheris/meta-coheris.service';
import { MetaCoheris } from 'app/shared/model/meta-coheris.model';

describe('Component Tests', () => {
  describe('MetaCoheris Management Component', () => {
    let comp: MetaCoherisComponent;
    let fixture: ComponentFixture<MetaCoherisComponent>;
    let service: MetaCoherisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaCoherisComponent]
      })
        .overrideTemplate(MetaCoherisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaCoherisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaCoherisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MetaCoheris(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.metaCoherises && comp.metaCoherises[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
