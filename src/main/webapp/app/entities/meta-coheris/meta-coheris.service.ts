import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMetaCoheris } from 'app/shared/model/meta-coheris.model';

type EntityResponseType = HttpResponse<IMetaCoheris>;
type EntityArrayResponseType = HttpResponse<IMetaCoheris[]>;

@Injectable({ providedIn: 'root' })
export class MetaCoherisService {
  public resourceUrl = SERVER_API_URL + 'api/meta-coherises';

  constructor(protected http: HttpClient) {}

  create(metaCoheris: IMetaCoheris): Observable<EntityResponseType> {
    return this.http.post<IMetaCoheris>(this.resourceUrl, metaCoheris, { observe: 'response' });
  }

  update(metaCoheris: IMetaCoheris): Observable<EntityResponseType> {
    return this.http.put<IMetaCoheris>(this.resourceUrl, metaCoheris, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMetaCoheris>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMetaCoheris[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
