import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaRecouvrementComponent } from 'app/entities/meta-recouvrement/meta-recouvrement.component';
import { MetaRecouvrementService } from 'app/entities/meta-recouvrement/meta-recouvrement.service';
import { MetaRecouvrement } from 'app/shared/model/meta-recouvrement.model';

describe('Component Tests', () => {
  describe('MetaRecouvrement Management Component', () => {
    let comp: MetaRecouvrementComponent;
    let fixture: ComponentFixture<MetaRecouvrementComponent>;
    let service: MetaRecouvrementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaRecouvrementComponent]
      })
        .overrideTemplate(MetaRecouvrementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetaRecouvrementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetaRecouvrementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MetaRecouvrement(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.metaRecouvrements && comp.metaRecouvrements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
