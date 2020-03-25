import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { PnApplicationTestModule } from '../../../test.module';
import { DemandeDetailComponent } from 'app/entities/demande/demande-detail.component';
import { Demande } from 'app/shared/model/demande.model';

describe('Component Tests', () => {
  describe('Demande Management Detail Component', () => {
    let comp: DemandeDetailComponent;
    let fixture: ComponentFixture<DemandeDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ demande: new Demande(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [DemandeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DemandeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DemandeDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load demande on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.demande).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
