import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { ParamDemandeComponent } from 'app/entities/param-demande/param-demande.component';
import { ParamDemandeService } from 'app/entities/param-demande/param-demande.service';
import { ParamDemande } from 'app/shared/model/param-demande.model';

describe('Component Tests', () => {
  describe('ParamDemande Management Component', () => {
    let comp: ParamDemandeComponent;
    let fixture: ComponentFixture<ParamDemandeComponent>;
    let service: ParamDemandeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [ParamDemandeComponent]
      })
        .overrideTemplate(ParamDemandeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamDemandeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamDemandeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ParamDemande(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paramDemandes && comp.paramDemandes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
