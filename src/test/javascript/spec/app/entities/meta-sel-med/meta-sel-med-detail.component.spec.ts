import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaSelMedDetailComponent } from 'app/entities/meta-sel-med/meta-sel-med-detail.component';
import { MetaSelMed } from 'app/shared/model/meta-sel-med.model';

describe('Component Tests', () => {
  describe('MetaSelMed Management Detail Component', () => {
    let comp: MetaSelMedDetailComponent;
    let fixture: ComponentFixture<MetaSelMedDetailComponent>;
    const route = ({ data: of({ metaSelMed: new MetaSelMed(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaSelMedDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MetaSelMedDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MetaSelMedDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load metaSelMed on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.metaSelMed).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
