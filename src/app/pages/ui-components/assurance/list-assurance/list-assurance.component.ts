import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Assurance {
  id: number;
  numPolice: string;
  compagnie: number;
  vehicule: number;
  dateDebutGarantie: Date;
  dateFinGarantie: Date;
  attestation: string;
}

interface Compagnie {
  id: number;
  nom: string;
}

interface Vehicule {
  id: number;
  designation: string;
}

@Component({
  selector: 'app-list-assurance',
  templateUrl: './list-assurance.component.html',
  styleUrls: ['./list-assurance.component.scss'],
})
export class ListAssuranceComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = [
    'id',
    'numPolice',
    'compagnie',
    'vehicule',
    'dateDebutGarantie',
    'dateFinGarantie',
    'attestation',
    'actions',
  ];

  assurances: Assurance[] = [
    {
      id: 1,
      numPolice: 'AB12345',
      compagnie: 1,
      vehicule: 1,
      dateDebutGarantie: new Date('2022-01-01'),
      dateFinGarantie: new Date('2023-01-01'),
      attestation: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      numPolice: 'CD67890',
      compagnie: 2,
      vehicule: 2,
      dateDebutGarantie: new Date('2021-05-15'),
      dateFinGarantie: new Date('2022-05-15'),
      attestation: 'https://via.placeholder.com/150'
    },
  ];

  compagnies: Compagnie[] = [
    { id: 1, nom: 'Compagnie A' },
    { id: 2, nom: 'Compagnie B' },
  ];

  vehicules: Vehicule[] = [
    { id: 1, designation: 'Peugeot 208' },
    { id: 2, designation: 'Renault Clio' },
  ];

  selectedAssurance: Assurance;
  isEdit: boolean = false;
  assuranceForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.assuranceForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      numPolice: [''],
      compagnie: [''],
      vehicule: [''],
      dateDebutGarantie: [''],
      dateFinGarantie: [''],
      attestation: ['']
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.assuranceForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(assurance: Assurance): void {
    this.isEdit = true;
    this.selectedAssurance = assurance;
    this.assuranceForm.patchValue(assurance);
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.assuranceForm.patchValue({ attestation: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  sauvegarderAssurance(): void {
    const assuranceData = this.assuranceForm.getRawValue();
    if (this.isEdit) {
      Object.assign(this.selectedAssurance, assuranceData);
    } else {
      this.assurances.push(assuranceData);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(assurance: Assurance): void {
    this.selectedAssurance = assurance;
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
    this.assurances = this.assurances.filter(a => a !== this.selectedAssurance);
    this.fermerDialog();
  }

  getCompagnieName(compagnieId: number): string {
    const compagnie = this.compagnies.find(c => c.id === compagnieId);
    return compagnie ? compagnie.nom : '';
  }

  getVehiculeName(vehiculeId: number): string {
    const vehicule = this.vehicules.find(v => v.id === vehiculeId);
    return vehicule ? vehicule.designation : '';
  }
}
