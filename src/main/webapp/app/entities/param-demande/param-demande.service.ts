import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParamDemande } from 'app/shared/model/param-demande.model';

type EntityResponseType = HttpResponse<IParamDemande>;
type EntityArrayResponseType = HttpResponse<IParamDemande[]>;

@Injectable({ providedIn: 'root' })
export class ParamDemandeService {
  public resourceUrl = SERVER_API_URL + 'api/param-demandes';

  constructor(protected http: HttpClient) {}

  create(paramDemande: IParamDemande): Observable<EntityResponseType> {
    return this.http.post<IParamDemande>(this.resourceUrl, paramDemande, { observe: 'response' });
  }

  update(paramDemande: IParamDemande): Observable<EntityResponseType> {
    return this.http.put<IParamDemande>(this.resourceUrl, paramDemande, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParamDemande>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParamDemande[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
