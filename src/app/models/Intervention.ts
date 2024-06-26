import { Vehicule } from './Vehicule';
import { Tache } from './Tache';
import { Garage } from './garage';
import { TIntervention } from './TIntervention';

export interface Intervention {
  idIntervention: number;
  objetIntervention: string;
  dateIntervention: Date;
  echeanceIntervention: Date;
  kmIntervention: number;
  vehicule: Vehicule;
  typeIntervention: TIntervention;
  garage: Garage;
  taches: Tache[];
}
