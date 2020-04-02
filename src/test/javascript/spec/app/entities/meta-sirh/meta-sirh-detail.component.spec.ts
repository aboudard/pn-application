import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaSIRHDetailComponent } from 'app/entities/meta-sirh/meta-sirh-detail.component';
import { MetaSIRH } from 'app/shared/model/meta-sirh.model';

describe('Component Tests', () => {
  describe('MetaSIRH Management Detail Component', () => {
    let comp: MetaSIRHDetailComponent;
    let fixture: ComponentFixture<MetaSIRHDetailComponent>;
    const route = ({ data: of({ metaSIRH: new MetaSIRH(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaSIRHDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MetaSIRHDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MetaSIRHDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load metaSIRH on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.metaSIRH).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
