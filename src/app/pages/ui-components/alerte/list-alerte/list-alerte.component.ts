import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Alerte {
  id: number;
  description: string;
  vehicule: number;
  kilometrageAlerte: number;
  dateAlerte: Date;
  statut: string;
}

interface Vehicule {
  id: number;
  designation: string;
}

@Component({
  selector: 'app-list-alerte',
  templateUrl: './list-alerte.component.html',
  styleUrls: ['./list-alerte.component.scss'],
})
export class ListAlerteComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = [
    'id',
    'description',
    'vehicule',
    'kilometrageAlerte',
    'dateAlerte',
    'statut',
    'actions',
  ];

  alertes: Alerte[] = [
    {
      id: 1,
      description: 'Changement de pneu',
      vehicule: 1,
      kilometrageAlerte: 50000,
      dateAlerte: new Date('2023-01-01'),
      statut: 'Activer',
    },
    {
      id: 2,
      description: 'Vidange',
      vehicule: 2,
      kilometrageAlerte: 10000,
      dateAlerte: new Date('2023-05-15'),
      statut: 'Desactiver',
    },
  ];

  vehicules: Vehicule[] = [
    { id: 1, designation: 'Peugeot 208' },
    { id: 2, designation: 'Renault Clio' },
  ];

  statuts: string[] = ['Activer', 'Desactiver'];

  selectedAlerte: Alerte;
  isEdit: boolean = false;
  alerteForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.alerteForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      description: [''],
      vehicule: [''],
      kilometrageAlerte: [''],
      dateAlerte: [''],
      statut: [''],
    });
  }

  ngOnInit(): void {}

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
    const alerteData = this.alerteForm.getRawValue();
    if (this.isEdit) {
      Object.assign(this.selectedAlerte, alerteData);
    } else {
      this.alertes.push(alerteData);
    }
    this.dialog.closeAll();
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
    this.alertes = this.alertes.filter((a) => a !== this.selectedAlerte);
    this.fermerDialog();
  }

  getVehiculeName(vehiculeId: number): string {
    const vehicule = this.vehicules.find((v) => v.id === vehiculeId);
    return vehicule ? vehicule.designation : '';
  }
}
