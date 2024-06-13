interface Utilisateur {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  username: string;
  email: string;
  password: string;
  tel: string;
  adresse: string;
  dateDeNaissance: string; // Assuming date is represented as a string
  photo: string;
  departement: Departement;
  role: Role;
}
