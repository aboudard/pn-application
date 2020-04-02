import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaVieDetailComponent } from 'app/entities/meta-vie/meta-vie-detail.component';
import { MetaVie } from 'app/shared/model/meta-vie.model';

describe('Component Tests', () => {
  describe('MetaVie Management Detail Component', () => {
    let comp: MetaVieDetailComponent;
    let fixture: ComponentFixture<MetaVieDetailComponent>;
    const route = ({ data: of({ metaVie: new MetaVie(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaVieDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MetaVieDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MetaVieDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load metaVie on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.metaVie).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
