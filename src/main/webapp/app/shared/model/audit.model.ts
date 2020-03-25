import { Moment } from 'moment';
import { Action } from 'app/shared/model/enumerations/action.model';

export interface IAudit {
  id?: number;
  idEdition?: number;
  date?: Moment;
  badge?: string;
  action?: Action;
}

export class Audit implements IAudit {
  constructor(public id?: number, public idEdition?: number, public date?: Moment, public badge?: string, public action?: Action) {}
}
