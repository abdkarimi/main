import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Garage {
  nom: string;
  adresse: string;
  tel: string;
  email: string;
  fax: string;
  nomresp: string;
  gsmresp: string;
}

@Component({
  selector: 'app-list-garage',
  templateUrl: './list-garage.component.html',
  styleUrls: ['./list-garage.component.scss'],
})
export class ListGarageComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = [
    'nom',
    'adresse',
    'tel',
    'email',
    'fax',
    'nomresp',
    'gsmresp',
    'actions',
  ];
  garages: Garage[] = [
    {
      nom: 'Garage 1',
      adresse: 'Adresse 1',
      tel: '0123456789',
      email: 'email1@example.com',
      fax: '0123456789',
      nomresp: 'Responsable 1',
      gsmresp: '0612345678',
    },
    {
      nom: 'Garage 2',
      adresse: 'Adresse 2',
      tel: '0123456789',
      email: 'email2@example.com',
      fax: '0123456789',
      nomresp: 'Responsable 2',
      gsmresp: '0612345678',
    },
  ];

  selectedGarage: Garage;
  isEdit: boolean = false;
  garageForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.garageForm = this.fb.group({
      nom: [''],
      adresse: [''],
      tel: [''],
      email: [''],
      fax: [''],
      nomresp: [''],
      gsmresp: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.garageForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(garage: Garage): void {
    this.isEdit = true;
    this.selectedGarage = garage;
    this.garageForm.patchValue(garage);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderGarage(): void {
    if (this.isEdit) {
      Object.assign(this.selectedGarage, this.garageForm.value);
    } else {
      this.garages.push(this.garageForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(garage: Garage): void {
    this.selectedGarage = garage;
    this.dialog.open(this.dialogSuppression, {
      width: '400px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
  }

  confirmerSuppression(): void {
    this.garages = this.garages.filter((g) => g !== this.selectedGarage);
    this.fermerDialog();
  }
}
