import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { OrdreMission } from 'src/app/models/OrdreMission';
import { Vehicule } from 'src/app/models/Vehicule';
import { Destination } from 'src/app/models/Destination';
import { OrdremissionService } from 'src/app/services/OrdreMission/ordremission.service';
import { VehiculeService } from 'src/app/services/Vehicule/vehicule.service';
import { DestinationService } from 'src/app/services/Destination/destination.service';

@Component({
  selector: 'app-list-ordre-mission',
  templateUrl: './list-ordre-mission.component.html',
  styleUrls: ['./list-ordre-mission.component.scss'],
})
export class ListOrdreMissionComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = [
    'reference',
    'date',
    'matricule',
    'motif',
    'destination',
    'dateDepart',
    'heureDepart',
    'dateRetour',
    'heureRetour',
    'statut',
    'validePar',
    'actions',
  ];

  ordresMission: OrdreMission[] = [];
  vehicules: Vehicule[] = [];
  destinations: Destination[] = [];
  heures: string[] = this.generateHeures();

  selectedOrdreMission: OrdreMission;
  isEdit: boolean = false;
  ordreMissionForm: FormGroup;
  todayDate: Date = new Date();

  constructor(
    private ordreMissionService: OrdremissionService,
    private vehiculeService: VehiculeService,
    private destinationService: DestinationService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  initializeForm(): void {
    this.ordreMissionForm = this.fb.group({
      idOm: [0],
      refOm: [{ value: '', disabled: true }],
      dateOm: [this.todayDate],
      objetOm: ['', Validators.required],
      kmDepartOm: ['', Validators.required],
      kmRetourOm: ['', Validators.required],
      dotationCarburant: ['', Validators.required],
      statutOm: ['', Validators.required],
      dateDepart: ['', Validators.required],
      heureDepart: ['', Validators.required],
      dateRetour: ['', Validators.required],
      heureRetour: ['', Validators.required],
      dateApprobation: [''],
      dateValidation: [''],
      agent: this.fb.group({
        id: ['']
      }),
      approbateur: this.fb.group({
        id: ['']
      }),
      validateur: this.fb.group({
        id: ['']
      }),
      vehicule: this.fb.group({
        idVehicule: ['', Validators.required],
        matriculeVehicule: [{ value: '', disabled: true }, Validators.required],
        marqueVehicule: [{ value: '', disabled: true }],
        modeleVehicule: [{ value: '', disabled: true }],
        kilometrageVehicule: [{ value: '', disabled: true }]
      }),
      destination: this.fb.group({
        idDestination: ['', Validators.required]
      }),
      perimetre: this.fb.group({
        idPerimetre: ['']
      }),
      historiqueTrajets: this.fb.group({
        idHistoriqueTrajet: ['']
      }),
      accompagnant: this.fb.array([])
    });
  }

  loadData(): void {
    this.ordreMissionService.getAllOrdreMissions().subscribe((data) => {
      this.ordresMission = data;
    });
    this.vehiculeService.getAllVehicules().subscribe((data) => {
      this.vehicules = data;
    });
    this.destinationService.getAllDestinations().subscribe((data) => {
      this.destinations = data;
    });
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.ordreMissionForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '1000px',
      autoFocus: false,
    });
  }

  ouvrirDialogModification(ordreMission: OrdreMission): void {
    this.isEdit = true;
    this.selectedOrdreMission = ordreMission;
    this.ordreMissionForm.patchValue(ordreMission);
    this.dialog.open(this.dialogAjoutModification, {
      width: '1000px',
      autoFocus: false,
    });
  }

  sauvegarderOrdreMission(): void {
    if (this.ordreMissionForm.invalid) {
      this.toastr.warning(
        'Veuillez corriger les erreurs du formulaire avant de soumettre.',
        'Validation échouée'
      );
      return;
    }
    if (this.isEdit) {
      this.ordreMissionService
        .updateOrdreMission(
          this.selectedOrdreMission.idOm,
          this.ordreMissionForm.value
        )
        .subscribe(
          () => {
            this.loadData();
            this.fermerDialog();
            this.ordreMissionForm.reset();
            this.toastr.success(
              'Ordre de mission modifié avec succès.',
              'Succès'
            );
          },
          (error) => {
            this.handleHttpError(error);
          }
        );
    } else {
      this.ordreMissionService
        .createOrdreMission(this.ordreMissionForm.value)
        .subscribe(
          () => {
            this.loadData();
            this.fermerDialog();
            this.ordreMissionForm.reset();
            this.toastr.success(
              'Ordre de mission ajouté avec succès.',
              'Succès'
            );
          },
          (error) => {
            this.handleHttpError(error);
          }
        );
    }
  }

  ouvrirDialogSuppression(ordreMission: OrdreMission): void {
    this.selectedOrdreMission = ordreMission;
    this.dialog.open(this.dialogSuppression, {
      width: '400px',
      autoFocus: false,
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
  }

  confirmerSuppression(): void {
    this.ordreMissionService
      .deleteOrdreMission(this.selectedOrdreMission.idOm)
      .subscribe(
        () => {
          this.ordresMission = this.ordresMission.filter(
            (o) => o !== this.selectedOrdreMission
          );
          this.fermerDialog();
          this.toastr.success(
            'Ordre de mission supprimé avec succès.',
            'Succès'
          );
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
  }

  private handleHttpError(error: any): void {
    if (error.status === 409) {
      this.toastr.warning(
        'Un ordre de mission avec les mêmes attributs existe déjà.',
        'Erreur de conflit'
      );
    } else if (error.status === 500) {
      this.toastr.error(
        "Erreur lors de l'enregistrement de l'ordre de mission.",
        'Erreur interne du serveur'
      );
    } else {
      this.toastr.error("Une erreur inattendue s'est produite.", 'Erreur');
    }
  }

  onVehiculeSelected(event: any): void {
    const selectedVehicule = this.vehicules.find(
      (v) => v.idVehicule === event.value
    );
    if (selectedVehicule) {
      this.ordreMissionForm.patchValue({
        vehicule: {
          idVehicule: selectedVehicule.idVehicule,
          matriculeVehicule: selectedVehicule.matriculeVehicule,
          marqueVehicule: selectedVehicule.modele.marque.libelleMarque,
          modeleVehicule: selectedVehicule.modele.libelleModele,
          kilometrageVehicule: selectedVehicule.kilometrageVehicule
        }
      });
    }
  }

  generateHeures(): string[] {
    const heures = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        heures.push(
          `${h.toString().padStart(2, '0')}H${m.toString().padStart(2, '0')}`
        );
      }
    }
    return heures;
  }
}
