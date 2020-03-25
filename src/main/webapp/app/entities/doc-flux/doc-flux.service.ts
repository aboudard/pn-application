import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocFlux } from 'app/shared/model/doc-flux.model';

type EntityResponseType = HttpResponse<IDocFlux>;
type EntityArrayResponseType = HttpResponse<IDocFlux[]>;

@Injectable({ providedIn: 'root' })
export class DocFluxService {
  public resourceUrl = SERVER_API_URL + 'api/doc-fluxes';

  constructor(protected http: HttpClient) {}

  create(docFlux: IDocFlux): Observable<EntityResponseType> {
    return this.http.post<IDocFlux>(this.resourceUrl, docFlux, { observe: 'response' });
  }

  update(docFlux: IDocFlux): Observable<EntityResponseType> {
    return this.http.put<IDocFlux>(this.resourceUrl, docFlux, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocFlux>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocFlux[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
