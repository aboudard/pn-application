export interface IParamDemande {
  id?: number;
  idDemande?: string;
  fgcle?: number;
  nomDataLoader?: number;
  versionDataLoader?: string;
  nomModele?: number;
  idModele?: number;
  versionModele?: string;
  impression?: string;
  archivage?: string;
  interactive?: string;
  stockage?: string;
  hostCol?: string;
  impCentr?: string;
  instCol?: string;
  impHCentr?: string;
  lotCont?: string;
  dest?: string;
  triRegrouptBann?: string;
  regles?: number;
  conditionnement?: string;
  periodicite?: string;
  flagMail?: string;
  description?: string;
  versionMo?: number;
  queuesEaiIn?: string;
  queuesEaiOut?: string;
  libre2?: number;
  libre4?: number;
}

export class ParamDemande implements IParamDemande {
  constructor(
    public id?: number,
    public idDemande?: string,
    public fgcle?: number,
    public nomDataLoader?: number,
    public versionDataLoader?: string,
    public nomModele?: number,
    public idModele?: number,
    public versionModele?: string,
    public impression?: string,
    public archivage?: string,
    public interactive?: string,
    public stockage?: string,
    public hostCol?: string,
    public impCentr?: string,
    public instCol?: string,
    public impHCentr?: string,
    public lotCont?: string,
    public dest?: string,
    public triRegrouptBann?: string,
    public regles?: number,
    public conditionnement?: string,
    public periodicite?: string,
    public flagMail?: string,
    public description?: string,
    public versionMo?: number,
    public queuesEaiIn?: string,
    public queuesEaiOut?: string,
    public libre2?: number,
    public libre4?: number
  ) {}
}
