import { Moment } from 'moment';
import { IDocFlux } from 'app/shared/model/doc-flux.model';
import { Statut } from 'app/shared/model/enumerations/statut.model';

export interface IDemande {
  id?: number;
  idTech?: number;
  domaine?: string;
  idDemande?: string;
  badge?: string;
  dateDemande?: Moment;
  statut?: Statut;
  fluxContentType?: string;
  flux?: any;
  idDemandes?: IDocFlux[];
}

export class Demande implements IDemande {
  constructor(
    public id?: number,
    public idTech?: number,
    public domaine?: string,
    public idDemande?: string,
    public badge?: string,
    public dateDemande?: Moment,
    public statut?: Statut,
    public fluxContentType?: string,
    public flux?: any,
    public idDemandes?: IDocFlux[]
  ) {}
}
