import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMetaReglement } from 'app/shared/model/meta-reglement.model';

type EntityResponseType = HttpResponse<IMetaReglement>;
type EntityArrayResponseType = HttpResponse<IMetaReglement[]>;

@Injectable({ providedIn: 'root' })
export class MetaReglementService {
  public resourceUrl = SERVER_API_URL + 'api/meta-reglements';

  constructor(protected http: HttpClient) {}

  create(metaReglement: IMetaReglement): Observable<EntityResponseType> {
    return this.http.post<IMetaReglement>(this.resourceUrl, metaReglement, { observe: 'response' });
  }

  update(metaReglement: IMetaReglement): Observable<EntityResponseType> {
    return this.http.put<IMetaReglement>(this.resourceUrl, metaReglement, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMetaReglement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMetaReglement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
