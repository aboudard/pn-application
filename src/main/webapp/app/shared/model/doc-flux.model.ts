import { IDemande } from 'app/shared/model/demande.model';

export interface IDocFlux {
  id?: number;
  idEdition?: string;
  libelle?: string;
  modele?: string;
  famille?: string;
  version?: string;
  idEditions?: IDemande[];
}

export class DocFlux implements IDocFlux {
  constructor(
    public id?: number,
    public idEdition?: string,
    public libelle?: string,
    public modele?: string,
    public famille?: string,
    public version?: string,
    public idEditions?: IDemande[]
  ) {}
}
