import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMetaSelMed } from 'app/shared/model/meta-sel-med.model';

type EntityResponseType = HttpResponse<IMetaSelMed>;
type EntityArrayResponseType = HttpResponse<IMetaSelMed[]>;

@Injectable({ providedIn: 'root' })
export class MetaSelMedService {
  public resourceUrl = SERVER_API_URL + 'api/meta-sel-meds';

  constructor(protected http: HttpClient) {}

  create(metaSelMed: IMetaSelMed): Observable<EntityResponseType> {
    return this.http.post<IMetaSelMed>(this.resourceUrl, metaSelMed, { observe: 'response' });
  }

  update(metaSelMed: IMetaSelMed): Observable<EntityResponseType> {
    return this.http.put<IMetaSelMed>(this.resourceUrl, metaSelMed, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMetaSelMed>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMetaSelMed[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
