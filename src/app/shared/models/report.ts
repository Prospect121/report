import { IArea } from './area';
import { IConcept } from './concept';
import { IUser } from './user-audit';

export interface IReport {
  id: number;
  auditor: IUser;
  date: Date;
  identification: string;
  area: IArea;
  responsible: string;
  cdaCode: string;
  pdvCode: string;
  concept: IConcept;
  improvement: string;
  value: string;
  activity: string;
  followUp: string;
  status: string;
}
