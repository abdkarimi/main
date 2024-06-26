import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Alerte } from 'src/app/models/Alerte';
import { Vehicule } from 'src/app/models/Vehicule';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { VehiculeService } from 'src/app/services/Vehicule/vehicule.service';

@Component({
  selector: 'app-list-alerte',
  templateUrl: './list-alerte.component.html',
  styleUrls: ['./list-alerte.component.scss'],
})
export class ListAlerteComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = [
    'idAlerte',
    'descriptionAlerte',
    'vehicule',
    'kmAlerte',
    'declencheAlerte',
    'status',
    'actions',
  ];

  alertes: Alerte[] = [];
  vehicules: Vehicule[] = [];
  statuts: string[] = ['Activer', 'Desactiver'];

  selectedAlerte: Alerte;
  isEdit: boolean = false;
  alerteForm: FormGroup;

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private vehiculeService: VehiculeService,
    private toastr: ToastrService,
  ) {
    this.alerteForm = this.fb.group({
      idAlerte: [{ value: '', disabled: true }],
      descriptionAlerte: ['', Validators.required],
      vehicule: this.fb.group({
        idVehicule: ['', Validators.required],
      }),
      kmAlerte: ['', Validators.required],
      declencheAlerte: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.alertService.getAllAlertes().subscribe((data) => {this.alertes = data;});
    this.vehiculeService.getAllVehicules().subscribe((data) => (this.vehicules = data));
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.alerteForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(alerte: Alerte): void {
    this.isEdit = true;
    this.selectedAlerte = alerte;
    this.alerteForm.patchValue(alerte);
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderAlerte(): void {
    if (this.alerteForm.invalid) {
      this.toastr.warning('Veuillez corriger les erreurs du formulaire avant de soumettre.', 'Validation échouée');
      return;
    }
    const alerteData = this.alerteForm.getRawValue();
    if (this.isEdit) {
      this.alertService.updateAlerte(this.selectedAlerte.idAlerte, alerteData).subscribe(
        () => {
          this.loadData();
          this.fermerDialog();
          this.toastr.success('Alerte modifiée avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    } else {
      this.alertService.createAlerte(alerteData).subscribe(
        () => {
          this.loadData();
          this.fermerDialog();
          this.toastr.success('Alerte ajoutée avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    }
  }

  ouvrirDialogSuppression(alerte: Alerte): void {
    this.selectedAlerte = alerte;
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
    this.alertService.deleteAlerte(this.selectedAlerte.idAlerte).subscribe(
      () => {
        this.alertes = this.alertes.filter((a) => a !== this.selectedAlerte);
        this.fermerDialog();
        this.toastr.success('Alerte supprimée avec succès.', 'Succès');
      },
      (error) => {
        this.handleHttpError(error);
      }
    );
  }

  private handleHttpError(error: any): void {
    if (error.status === 409) {
      this.toastr.warning('Une alerte avec les mêmes attributs existe déjà.', 'Erreur de conflit');
    } else if (error.status === 500) {
      this.toastr.error("Erreur lors de l'enregistrement de l'alerte.", 'Erreur interne du serveur');
    } else {
      this.toastr.error("Une erreur inattendue s'est produite.", 'Erreur');
    }
  }

  getVehiculeName(vehiculeId: number): string {
    const vehicule = this.vehicules.find((v) => v.idVehicule === vehiculeId);
    return vehicule ? vehicule.matriculeVehicule : '';
  }
}
