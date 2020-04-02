import { IDemande } from 'app/shared/model/demande.model';

export interface IMetaCoheris {
  id?: number;
  idTech?: number;
  societe?: string;
  numSous?: string;
  numGRC?: string;
  idTech?: IDemande;
}

export class MetaCoheris implements IMetaCoheris {
  constructor(
    public id?: number,
    public idTech?: number,
    public societe?: string,
    public numSous?: string,
    public numGRC?: string,
    public idTech?: IDemande
  ) {}
}
