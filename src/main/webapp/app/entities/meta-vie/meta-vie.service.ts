import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMetaVie } from 'app/shared/model/meta-vie.model';

type EntityResponseType = HttpResponse<IMetaVie>;
type EntityArrayResponseType = HttpResponse<IMetaVie[]>;

@Injectable({ providedIn: 'root' })
export class MetaVieService {
  public resourceUrl = SERVER_API_URL + 'api/meta-vies';

  constructor(protected http: HttpClient) {}

  create(metaVie: IMetaVie): Observable<EntityResponseType> {
    return this.http.post<IMetaVie>(this.resourceUrl, metaVie, { observe: 'response' });
  }

  update(metaVie: IMetaVie): Observable<EntityResponseType> {
    return this.http.put<IMetaVie>(this.resourceUrl, metaVie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMetaVie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMetaVie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
