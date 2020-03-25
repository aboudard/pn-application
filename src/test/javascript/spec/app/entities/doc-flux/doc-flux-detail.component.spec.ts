import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { DocFluxDetailComponent } from 'app/entities/doc-flux/doc-flux-detail.component';
import { DocFlux } from 'app/shared/model/doc-flux.model';

describe('Component Tests', () => {
  describe('DocFlux Management Detail Component', () => {
    let comp: DocFluxDetailComponent;
    let fixture: ComponentFixture<DocFluxDetailComponent>;
    const route = ({ data: of({ docFlux: new DocFlux(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [DocFluxDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DocFluxDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocFluxDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load docFlux on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.docFlux).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
