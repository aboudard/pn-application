import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { ParamDemandeDetailComponent } from 'app/entities/param-demande/param-demande-detail.component';
import { ParamDemande } from 'app/shared/model/param-demande.model';

describe('Component Tests', () => {
  describe('ParamDemande Management Detail Component', () => {
    let comp: ParamDemandeDetailComponent;
    let fixture: ComponentFixture<ParamDemandeDetailComponent>;
    const route = ({ data: of({ paramDemande: new ParamDemande(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [ParamDemandeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ParamDemandeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamDemandeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paramDemande on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paramDemande).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
