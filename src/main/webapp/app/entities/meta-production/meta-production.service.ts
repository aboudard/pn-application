import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMetaProduction } from 'app/shared/model/meta-production.model';

type EntityResponseType = HttpResponse<IMetaProduction>;
type EntityArrayResponseType = HttpResponse<IMetaProduction[]>;

@Injectable({ providedIn: 'root' })
export class MetaProductionService {
  public resourceUrl = SERVER_API_URL + 'api/meta-productions';

  constructor(protected http: HttpClient) {}

  create(metaProduction: IMetaProduction): Observable<EntityResponseType> {
    return this.http.post<IMetaProduction>(this.resourceUrl, metaProduction, { observe: 'response' });
  }

  update(metaProduction: IMetaProduction): Observable<EntityResponseType> {
    return this.http.put<IMetaProduction>(this.resourceUrl, metaProduction, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMetaProduction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMetaProduction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
