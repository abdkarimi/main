import { Compagnie } from './Compagnie';
import { Vehicule } from './Vehicule';

export interface Assurance {
  idAssurance: number;
  police: string;
  debutGarantie: Date;
  finGarantie: Date;
  cheminPolice: string;
  compagnie: Compagnie;
  vehicule:Vehicule;
}
