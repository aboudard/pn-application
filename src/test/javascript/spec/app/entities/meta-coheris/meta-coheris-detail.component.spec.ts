import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PnApplicationTestModule } from '../../../test.module';
import { MetaCoherisDetailComponent } from 'app/entities/meta-coheris/meta-coheris-detail.component';
import { MetaCoheris } from 'app/shared/model/meta-coheris.model';

describe('Component Tests', () => {
  describe('MetaCoheris Management Detail Component', () => {
    let comp: MetaCoherisDetailComponent;
    let fixture: ComponentFixture<MetaCoherisDetailComponent>;
    const route = ({ data: of({ metaCoheris: new MetaCoheris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [MetaCoherisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MetaCoherisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MetaCoherisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load metaCoheris on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.metaCoheris).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
