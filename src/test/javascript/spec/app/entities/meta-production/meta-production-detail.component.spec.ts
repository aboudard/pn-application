import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaProductionDetailComponent } from 'app/entities/meta-production/meta-production-detail.component';
import { MetaProduction } from 'app/shared/model/meta-production.model';

describe('Component Tests', () => {
  describe('MetaProduction Management Detail Component', () => {
    let comp: MetaProductionDetailComponent;
    let fixture: ComponentFixture<MetaProductionDetailComponent>;
    const route = ({ data: of({ metaProduction: new MetaProduction(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaProductionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MetaProductionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MetaProductionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load metaProduction on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.metaProduction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
