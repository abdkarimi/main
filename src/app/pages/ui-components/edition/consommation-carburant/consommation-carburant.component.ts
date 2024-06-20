import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Vehicule {
  id: number;
  designation: string;
  photoUrl: string;
}

interface OrdreMission {
  date: Date;
  refOrdreMission: string;
  destination: string;
  dotationCarburant: number;
  conducteur: number;
  kmDepart: number;
  kmRetour: number;
  objet: string;
}

interface Agent {
  matricule: number;
  nom: string;
  prenom: string;
}

@Component({
  selector: 'app-consommation-carburant',
  templateUrl: './consommation-carburant.component.html',
  styleUrls: ['./consommation-carburant.component.scss'],
})
export class ConsommationCarburantComponent implements OnInit {
  @ViewChild('dialogDetailVehicule') dialogDetailVehicule: TemplateRef<any>;

  vehicules: Vehicule[] = [
    { id: 1, designation: 'Peugeot 208', photoUrl: 'https://via.placeholder.com/150' },
    { id: 2, designation: 'Renault Clio', photoUrl: 'https://via.placeholder.com/150' },
  ];

  ordresMissions: OrdreMission[] = [
    { date: new Date('2023-01-01'), refOrdreMission: 'OM001', destination: 'Paris', dotationCarburant: 50, conducteur: 1, kmDepart: 1000, kmRetour: 1200, objet: 'Réunion' },
    { date: new Date('2023-02-15'), refOrdreMission: 'OM002', destination: 'Lyon', dotationCarburant: 70, conducteur: 2, kmDepart: 2000, kmRetour: 2500, objet: 'Livraison' },
  ];

  agents: Agent[] = [
    { matricule: 1, nom: 'Dupont', prenom: 'Jean' },
    { matricule: 2, nom: 'Martin', prenom: 'Marie' },
  ];

  selectedVehicule: Vehicule;
  vehiculeDetailForm: FormGroup;

  displayedColumns: string[] = [
    'date',
    'refOrdreMission',
    'destination',
    'dotationCarburant',
    'conducteur',
    'kmDepart',
    'kmRetour',
    'objet',
  ];

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.vehiculeDetailForm = this.fb.group({
      dateDebut: [''],
      dateFin: ['']
    });
  }

  ngOnInit(): void {}

  ouvrirDetailVehicule(vehicule: Vehicule): void {
    this.selectedVehicule = vehicule;
    this.dialog.open(this.dialogDetailVehicule, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
  }

  getAgentName(matricule: number): string {
    const agent = this.agents.find(a => a.matricule === matricule);
    return agent ? `${agent.nom} ${agent.prenom}` : '';
  }

  getTotalDotationCarburant(): number {
    return this.ordresMissions.reduce((total, mission) => total + mission.dotationCarburant, 0);
  }
}
