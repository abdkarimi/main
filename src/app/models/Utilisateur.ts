import { Role } from "./Role";
import { Structure } from "./Structure";

export interface Utilisateur {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  username: string;
  email: string;
  password: string;
  tel: string;
  adresse: string;
  dateDeNaissance: Date;
  dateDeRecrutement: Date;
  photo: string;
  idRole: Role;
  structure: Structure;
}
