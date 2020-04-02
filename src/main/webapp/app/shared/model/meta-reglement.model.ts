import { IDemande } from 'app/shared/model/demande.model';

export interface IMetaReglement {
  id?: number;
  idTech?: number;
  societe?: string;
  numSinistre?: string;
  numContratLgbt?: string;
  numSous?: string;
  idTech?: IDemande;
}

export class MetaReglement implements IMetaReglement {
  constructor(
    public id?: number,
    public idTech?: number,
    public societe?: string,
    public numSinistre?: string,
    public numContratLgbt?: string,
    public numSous?: string,
    public idTech?: IDemande
  ) {}
}
