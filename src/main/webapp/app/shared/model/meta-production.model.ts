import { IDemande } from 'app/shared/model/demande.model';

export interface IMetaProduction {
  id?: number;
  idTech?: number;
  societe?: string;
  numContratLgbt?: string;
  numSous?: string;
  idTech?: IDemande;
}

export class MetaProduction implements IMetaProduction {
  constructor(
    public id?: number,
    public idTech?: number,
    public societe?: string,
    public numContratLgbt?: string,
    public numSous?: string,
    public idTech?: IDemande
  ) {}
}
