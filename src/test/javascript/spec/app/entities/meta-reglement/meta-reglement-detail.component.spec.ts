import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaReglementDetailComponent } from 'app/entities/meta-reglement/meta-reglement-detail.component';
import { MetaReglement } from 'app/shared/model/meta-reglement.model';

describe('Component Tests', () => {
  describe('MetaReglement Management Detail Component', () => {
    let comp: MetaReglementDetailComponent;
    let fixture: ComponentFixture<MetaReglementDetailComponent>;
    const route = ({ data: of({ metaReglement: new MetaReglement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaReglementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MetaReglementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MetaReglementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load metaReglement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.metaReglement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
