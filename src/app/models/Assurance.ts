import { Compagnie } from './Compagnie';

export interface Assurance {
  idAssurance: number;
  police: string;
  debutGarantie: Date;
  finGarantie: Date;
  cheminPolice: string;
  compagnie: Compagnie;
}
