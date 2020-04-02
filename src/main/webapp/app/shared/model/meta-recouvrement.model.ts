import { IDemande } from 'app/shared/model/demande.model';

export interface IMetaRecouvrement {
  id?: number;
  idTech?: number;
  societe?: string;
  numSous?: string;
  idTech?: IDemande;
}

export class MetaRecouvrement implements IMetaRecouvrement {
  constructor(public id?: number, public idTech?: number, public societe?: string, public numSous?: string, public idTech?: IDemande) {}
}
