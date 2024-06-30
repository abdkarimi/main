import { Destination } from "./Destination";
import { HistoriqueTrajet } from "./HistoriqueTrajet";
import { Perimetre } from "./Perimetre";
import { Utilisateur } from "./Utilisateur";
import { Vehicule } from "./Vehicule";

export interface OrdreMission {
  idOm: number;
  refOm: string;
  dateOm: Date;
  objetOm: string;
  kmDepartOm: number;
  kmRetourOm: number;
  dotationCarburant: number;
  statutOm: string;
  dateDepart: Date;
  heureDepart: string;
  dateRetour: Date;
  heureRetour: string;
  dateApprobation: Date;
  dateValidation: Date;
  agent: Utilisateur;
  approbateur: Utilisateur;
  validateur: Utilisateur;
  vehicule: Vehicule;
  destination: Destination;
  perimetre: Perimetre;
  historiqueTrajets: HistoriqueTrajet;
  accompagnant: Utilisateur[];
}
