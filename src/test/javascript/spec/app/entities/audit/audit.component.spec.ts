import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PnApplicationTestModule } from '../../../test.module';
import { AuditComponent } from 'app/entities/audit/audit.component';
import { AuditService } from 'app/entities/audit/audit.service';
import { Audit } from 'app/shared/model/audit.model';

describe('Component Tests', () => {
  describe('Audit Management Component', () => {
    let comp: AuditComponent;
    let fixture: ComponentFixture<AuditComponent>;
    let service: AuditService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PnApplicationTestModule],
        declarations: [AuditComponent]
      })
        .overrideTemplate(AuditComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AuditComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AuditService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Audit(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.audits && comp.audits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
