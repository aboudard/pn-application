import { IDemande } from 'app/shared/model/demande.model';

export interface IMetaSelMed {
  id?: number;
  idTech?: number;
  numSous?: string;
  numDossier?: string;
  nomAssure?: string;
  idTech?: IDemande;
}

export class MetaSelMed implements IMetaSelMed {
  constructor(
    public id?: number,
    public idTech?: number,
    public numSous?: string,
    public numDossier?: string,
    public nomAssure?: string,
    public idTech?: IDemande
  ) {}
}
