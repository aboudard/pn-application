import { IDemande } from 'app/shared/model/demande.model';

export interface IMetaVie {
  id?: number;
  idTech?: number;
  numSous?: string;
  numContratVie?: string;
  idTech?: IDemande;
}

export class MetaVie implements IMetaVie {
  constructor(
    public id?: number,
    public idTech?: number,
    public numSous?: string,
    public numContratVie?: string,
    public idTech?: IDemande
  ) {}
}
