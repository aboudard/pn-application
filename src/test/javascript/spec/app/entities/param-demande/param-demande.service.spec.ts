import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ParamDemandeService } from 'app/entities/param-demande/param-demande.service';
import { IParamDemande, ParamDemande } from 'app/shared/model/param-demande.model';

describe('Service Tests', () => {
  describe('ParamDemande Service', () => {
    let injector: TestBed;
    let service: ParamDemandeService;
    let httpMock: HttpTestingController;
    let elemDefault: IParamDemande;
    let expectedResult: IParamDemande | IParamDemande[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ParamDemandeService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ParamDemande(
        0,
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ParamDemande', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ParamDemande()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ParamDemande', () => {
        const returnedFromService = Object.assign(
          {
            idDemande: 'BBBBBB',
            fgcle: 1,
            nomDataLoader: 1,
            versionDataLoader: 'BBBBBB',
            nomModele: 1,
            idModele: 1,
            versionModele: 'BBBBBB',
            impression: 'BBBBBB',
            archivage: 'BBBBBB',
            interactive: 'BBBBBB',
            stockage: 'BBBBBB',
            hostCol: 'BBBBBB',
            impCentr: 'BBBBBB',
            instCol: 'BBBBBB',
            impHCentr: 'BBBBBB',
            lotCont: 'BBBBBB',
            dest: 'BBBBBB',
            triRegrouptBann: 'BBBBBB',
            regles: 1,
            conditionnement: 'BBBBBB',
            periodicite: 'BBBBBB',
            flagMail: 'BBBBBB',
            description: 'BBBBBB',
            versionMo: 1,
            queuesEaiIn: 'BBBBBB',
            queuesEaiOut: 'BBBBBB',
            libre2: 1,
            libre4: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ParamDemande', () => {
        const returnedFromService = Object.assign(
          {
            idDemande: 'BBBBBB',
            fgcle: 1,
            nomDataLoader: 1,
            versionDataLoader: 'BBBBBB',
            nomModele: 1,
            idModele: 1,
            versionModele: 'BBBBBB',
            impression: 'BBBBBB',
            archivage: 'BBBBBB',
            interactive: 'BBBBBB',
            stockage: 'BBBBBB',
            hostCol: 'BBBBBB',
            impCentr: 'BBBBBB',
            instCol: 'BBBBBB',
            impHCentr: 'BBBBBB',
            lotCont: 'BBBBBB',
            dest: 'BBBBBB',
            triRegrouptBann: 'BBBBBB',
            regles: 1,
            conditionnement: 'BBBBBB',
            periodicite: 'BBBBBB',
            flagMail: 'BBBBBB',
            description: 'BBBBBB',
            versionMo: 1,
            queuesEaiIn: 'BBBBBB',
            queuesEaiOut: 'BBBBBB',
            libre2: 1,
            libre4: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ParamDemande', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
