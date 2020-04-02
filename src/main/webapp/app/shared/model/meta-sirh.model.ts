import { IDemande } from 'app/shared/model/demande.model';

export interface IMetaSIRH {
  id?: number;
  idTech?: number;
  numBadge?: string;
  numBadgeDest?: string;
  nomCollab?: string;
  prenomCollab?: string;
  codeUO?: string;
  idTech?: IDemande;
}

export class MetaSIRH implements IMetaSIRH {
  constructor(
    public id?: number,
    public idTech?: number,
    public numBadge?: string,
    public numBadgeDest?: string,
    public nomCollab?: string,
    public prenomCollab?: string,
    public codeUO?: string,
    public idTech?: IDemande
  ) {}
}
