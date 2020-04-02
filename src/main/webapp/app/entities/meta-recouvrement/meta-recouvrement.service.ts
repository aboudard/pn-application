import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMetaRecouvrement } from 'app/shared/model/meta-recouvrement.model';

type EntityResponseType = HttpResponse<IMetaRecouvrement>;
type EntityArrayResponseType = HttpResponse<IMetaRecouvrement[]>;

@Injectable({ providedIn: 'root' })
export class MetaRecouvrementService {
  public resourceUrl = SERVER_API_URL + 'api/meta-recouvrements';

  constructor(protected http: HttpClient) {}

  create(metaRecouvrement: IMetaRecouvrement): Observable<EntityResponseType> {
    return this.http.post<IMetaRecouvrement>(this.resourceUrl, metaRecouvrement, { observe: 'response' });
  }

  update(metaRecouvrement: IMetaRecouvrement): Observable<EntityResponseType> {
    return this.http.put<IMetaRecouvrement>(this.resourceUrl, metaRecouvrement, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMetaRecouvrement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMetaRecouvrement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
