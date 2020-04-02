import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaRecouvrementDetailComponent } from 'app/entities/meta-recouvrement/meta-recouvrement-detail.component';
import { MetaRecouvrement } from 'app/shared/model/meta-recouvrement.model';

describe('Component Tests', () => {
  describe('MetaRecouvrement Management Detail Component', () => {
    let comp: MetaRecouvrementDetailComponent;
    let fixture: ComponentFixture<MetaRecouvrementDetailComponent>;
    const route = ({ data: of({ metaRecouvrement: new MetaRecouvrement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaRecouvrementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MetaRecouvrementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MetaRecouvrementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load metaRecouvrement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.metaRecouvrement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
