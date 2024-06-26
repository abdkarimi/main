import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InterventionService } from 'src/app/services/Intervention/intervention.service';
import { VehiculeService } from 'src/app/services/Vehicule/vehicule.service';

import { Intervention } from 'src/app/models/Intervention';
import { Vehicule } from 'src/app/models/Vehicule';

import { Tache } from 'src/app/models/Tache';
import { TinterventionService } from 'src/app/services/TIntervention/tintervention.service';
import { TIntervention } from 'src/app/models/TIntervention';
import { Garage } from 'src/app/models/garage';
import { GarageService } from 'src/app/services/garage/garage.service';
import { TacheService } from 'src/app/services/tache/tache.service';

@Component({
  selector: 'app-list-intervention',
  templateUrl: './list-intervention.component.html',
  styleUrls: ['./list-intervention.component.scss'],
})
export class ListInterventionComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild('dialogDetails') dialogDetails: TemplateRef<any>;

  displayedColumns: string[] = [
    'objetIntervention',
    'dateIntervention',
    'typeIntervention',
    'kmIntervention',
    'garage',
    'actions',
  ];
  interventions: Intervention[] = [];
  vehicules: Vehicule[] = [];
  typeInterventions: TIntervention[] = [];
  garages: Garage[] = [];
  taches: Tache[] = [];

  selectedIntervention: Intervention;
  isEdit: boolean = false;
  interventionForm: FormGroup;

  constructor(
    private interventionService: InterventionService,
    private vehiculeService: VehiculeService,
    private typeInterventionService: TinterventionService,
    private garageService: GarageService,
    private tacheService: TacheService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.interventionForm = this.fb.group({
      idIntervention: 0,
      objetIntervention: ['', Validators.required],
      dateIntervention: ['', Validators.required],
      echeanceIntervention: ['', Validators.required],
      kmIntervention: ['', Validators.required],
      vehicule: this.fb.group({
        idVehicule: ['', Validators.required],
      }),
      typeIntervention: this.fb.group({
        idTypeIntervention: ['', Validators.required],
      }),
      garage: this.fb.group({
        idGarage: ['', Validators.required],
      }),
      taches: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.interventionService.getAllInterventions().subscribe((data) => {
      this.interventions = data;
    });
    this.vehiculeService.getAllVehicules().subscribe((data) => (this.vehicules = data));
    this.typeInterventionService.getAllTypeInterventions().subscribe((data) => (this.typeInterventions = data));
    this.garageService.getAllGarages().subscribe((data) => (this.garages = data));
    this.tacheService.getAllTaches().subscribe((data) => (this.taches = data));
  }

  get tachesFormArray(): FormArray {
    return this.interventionForm.get('taches') as FormArray;
  }

  ajouterTache(): void {
    const tacheFormGroup = this.fb.group({
      idTache: ['', Validators.required]
    });
    this.tachesFormArray.push(tacheFormGroup);
  }

  supprimerTache(index: number): void {
    this.tachesFormArray.removeAt(index);
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.interventionForm.reset();
    this.tachesFormArray.clear();
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(intervention: Intervention): void {
    this.isEdit = true;
    this.selectedIntervention = intervention;
    this.interventionForm.patchValue(intervention);
    this.tachesFormArray.clear();
    intervention.taches.forEach((tache) => {
      const tacheFormGroup = this.fb.group({
        idTache: [tache.idTache, Validators.required]
      });
      this.tachesFormArray.push(tacheFormGroup);
    });
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogDetails(intervention: Intervention): void {
    this.selectedIntervention = intervention;
    this.dialog.open(this.dialogDetails, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderIntervention(): void {
    if (this.interventionForm.invalid) {
      this.toastr.warning('Veuillez corriger les erreurs du formulaire avant de soumettre.', 'Validation échouée');
      return;
    }
    if (this.isEdit) {
      this.interventionService.updateIntervention(this.selectedIntervention.idIntervention, this.interventionForm.value).subscribe(
        () => {
          this.loadData();
          this.fermerDialog();
          this.interventionForm.reset();
          this.toastr.success('Intervention modifiée avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    } else {
      this.interventionService.createIntervention(this.interventionForm.value).subscribe(
        () => {
          this.loadData();
          this.fermerDialog();
          this.interventionForm.reset();
          this.toastr.success('Intervention ajoutée avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    }
  }

  ouvrirDialogSuppression(intervention: Intervention): void {
    this.selectedIntervention = intervention;
    this.dialog.open(this.dialogSuppression, {
      width: '400px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
  }

  confirmerSuppression(): void {
    this.interventionService.deleteIntervention(this.selectedIntervention.idIntervention).subscribe(
      () => {
        this.interventions = this.interventions.filter((i) => i !== this.selectedIntervention);
        this.fermerDialog();
        this.toastr.success('Intervention supprimée avec succès.', 'Succès');
      },
      (error) => {
        this.handleHttpError(error);
      }
    );
  }

  private handleHttpError(error: any): void {
    if (error.status === 409) {
      this.toastr.warning('Une intervention avec les mêmes attributs existe déjà.', 'Erreur de conflit');
    } else if (error.status === 500) {
      this.toastr.error("Erreur lors de l'enregistrement de l'intervention.", 'Erreur interne du serveur');
    } else {
      this.toastr.error("Une erreur inattendue s'est produite.", 'Erreur');
    }
  }

  getVehiculeName(id: number): string {
    const vehicule = this.vehicules.find((v) => v.idVehicule === id);
    return vehicule ? vehicule.matriculeVehicule : '';
  }

  getTypeInterventionName(id: number): string {
    const typeIntervention = this.typeInterventions.find((ti) => ti.idTypeIntervention === id);
    return typeIntervention ? typeIntervention.libelleTypeIntervention : '';
  }

  getGarageName(id: number): string {
    const garage = this.garages.find((g) => g.idGarage === id);
    return garage ? garage.nomGarage : '';
  }

  getTacheName(id: number): string {
    const tache = this.taches.find((t) => t.idTache === id);
    return tache ? tache.libelleTache : '';
  }
}
