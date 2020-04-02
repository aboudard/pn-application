import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMetaSIRH } from 'app/shared/model/meta-sirh.model';

type EntityResponseType = HttpResponse<IMetaSIRH>;
type EntityArrayResponseType = HttpResponse<IMetaSIRH[]>;

@Injectable({ providedIn: 'root' })
export class MetaSIRHService {
  public resourceUrl = SERVER_API_URL + 'api/meta-sirhs';

  constructor(protected http: HttpClient) {}

  create(metaSIRH: IMetaSIRH): Observable<EntityResponseType> {
    return this.http.post<IMetaSIRH>(this.resourceUrl, metaSIRH, { observe: 'response' });
  }

  update(metaSIRH: IMetaSIRH): Observable<EntityResponseType> {
    return this.http.put<IMetaSIRH>(this.resourceUrl, metaSIRH, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMetaSIRH>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMetaSIRH[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
