import { Vehicule } from "./Vehicule";

export interface Alerte {
    idAlerte: number;
    descriptionAlerte: string;
    kmAlerte: number;
    declencheAlerte: string;
    status: string;
    vehicule: Vehicule;
  }