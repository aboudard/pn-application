import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MetaReglementService } from 'app/entities/meta-reglement/meta-reglement.service';
import { IMetaReglement, MetaReglement } from 'app/shared/model/meta-reglement.model';

describe('Service Tests', () => {
  describe('MetaReglement Service', () => {
    let injector: TestBed;
    let service: MetaReglementService;
    let httpMock: HttpTestingController;
    let elemDefault: IMetaReglement;
    let expectedResult: IMetaReglement | IMetaReglement[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MetaReglementService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new MetaReglement(0, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MetaReglement', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MetaReglement()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MetaReglement', () => {
        const returnedFromService = Object.assign(
          {
            idTech: 1,
            societe: 'BBBBBB',
            numSinistre: 'BBBBBB',
            numContratLgbt: 'BBBBBB',
            numSous: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MetaReglement', () => {
        const returnedFromService = Object.assign(
          {
            idTech: 1,
            societe: 'BBBBBB',
            numSinistre: 'BBBBBB',
            numContratLgbt: 'BBBBBB',
            numSous: 'BBBBBB'
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

      it('should delete a MetaReglement', () => {
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
