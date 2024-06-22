import { Modele } from './Modele';
import { Enumeration } from './Enumeration';
import { Statut } from './Statut';
import { Concessionnaire } from './Concessionnaire';
import { TCarburant } from './TCarburant';
import { CatVehicule } from './CatVehicule';

export interface Vehicule {
  idVehicule: number;
  matriculeVehicule: string;
  dateCirculation: Date;
  puissanceFiscale: number;
  nbPlace: number;
  couleurVehicule: string;
  photoVehicule: string;
  modele: Modele;
  typeCarburant: TCarburant;
  typeVehicule: CatVehicule;
  enumeration: Enumeration;
  statut: Statut;
  concessionnaire: Concessionnaire;
}
