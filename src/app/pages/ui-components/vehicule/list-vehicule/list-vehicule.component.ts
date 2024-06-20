import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Vehicule {
  photo: string;
  matricule: string;
  dateMiseCirculation: Date;
  puissanceFiscale: string;
  nbrePlace: string;
  couleur: string;
  kilometrage: string;
  modele: number;
  carburant: number;
  categorie: number;
  enumeration: number;
  statut: number;
  concessionnaire: number;
}

interface Modele {
  id: number;
  designation: string;
}

interface Carburant {
  id: number;
  designation: string;
}

interface Categorie {
  id: number;
  designation: string;
}

interface Enumeration {
  id: number;
  designation: string;
}

interface Statut {
  id: number;
  designation: string;
}

interface Concessionnaire {
  id: number;
  designation: string;
}

@Component({
  selector: 'app-list-vehicule',
  templateUrl: './list-vehicule.component.html',
  styleUrls: ['./list-vehicule.component.scss'],
})
export class ListVehiculeComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild('dialogConsultation') dialogConsultation: TemplateRef<any>;

  displayedColumns: string[] = [
    'photo',
    'matricule',
    'dateMiseCirculation',
    'puissanceFiscale',
    'nbrePlace',
    'couleur',
    'kilometrage',
    'modele',
    'carburant',
    'categorie',
    'enumeration',
    'statut',
    'concessionnaire',
    'actions',
  ];
  vehicules: Vehicule[] = [
    {
      photo: 'https://via.placeholder.com/150',
      matricule: 'ABC-123',
      dateMiseCirculation: new Date('2020-01-01'),
      puissanceFiscale: '7CV',
      nbrePlace: '5',
      couleur: 'Rouge',
      kilometrage: '50000',
      modele: 1,
      carburant: 1,
      categorie: 1,
      enumeration: 1,
      statut: 1,
      concessionnaire: 1,
    },
    {
      photo: 'https://via.placeholder.com/150',
      matricule: 'XYZ-789',
      dateMiseCirculation: new Date('2018-05-15'),
      puissanceFiscale: '5CV',
      nbrePlace: '4',
      couleur: 'Bleu',
      kilometrage: '30000',
      modele: 2,
      carburant: 2,
      categorie: 2,
      enumeration: 2,
      statut: 2,
      concessionnaire: 2,
    },
  ];

  modeles: Modele[] = [
    { id: 1, designation: 'Modèle 1' },
    { id: 2, designation: 'Modèle 2' },
  ];

  carburants: Carburant[] = [
    { id: 1, designation: 'Essence' },
    { id: 2, designation: 'Diesel' },
  ];

  categories: Categorie[] = [
    { id: 1, designation: 'Catégorie 1' },
    { id: 2, designation: 'Catégorie 2' },
  ];

  enumerations: Enumeration[] = [
    { id: 1, designation: 'Énumération 1' },
    { id: 2, designation: 'Énumération 2' },
  ];

  statuts: Statut[] = [
    { id: 1, designation: 'Statut 1' },
    { id: 2, designation: 'Statut 2' },
  ];

  concessionnaires: Concessionnaire[] = [
    { id: 1, designation: 'Concessionnaire 1' },
    { id: 2, designation: 'Concessionnaire 2' },
  ];

  selectedVehicule: Vehicule;
  isEdit: boolean = false;
  vehiculeForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.vehiculeForm = this.fb.group({
      photo: [''],
      matricule: [''],
      dateMiseCirculation: [''],
      puissanceFiscale: [''],
      nbrePlace: [''],
      couleur: [''],
      kilometrage: [''],
      modele: [''],
      carburant: [''],
      categorie: [''],
      enumeration: [''],
      statut: [''],
      concessionnaire: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.vehiculeForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(vehicule: Vehicule): void {
    this.isEdit = true;
    this.selectedVehicule = vehicule;
    this.vehiculeForm.patchValue(vehicule);
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogConsultation(vehicule: Vehicule): void {
    this.selectedVehicule = vehicule;
    this.dialog.open(this.dialogConsultation, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.vehiculeForm.patchValue({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  sauvegarderVehicule(): void {
    if (this.isEdit) {
      Object.assign(this.selectedVehicule, this.vehiculeForm.value);
    } else {
      this.vehicules.push(this.vehiculeForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(vehicule: Vehicule): void {
    this.selectedVehicule = vehicule;
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
    this.vehicules = this.vehicules.filter((v) => v !== this.selectedVehicule);
    this.fermerDialog();
  }

  getModeleName(id: number): string {
    const modele = this.modeles.find((m) => m.id === id);
    return modele ? modele.designation : '';
  }

  getCarburantName(id: number): string {
    const carburant = this.carburants.find((c) => c.id === id);
    return carburant ? carburant.designation : '';
  }

  getCategorieName(id: number): string {
    const categorie = this.categories.find((c) => c.id === id);
    return categorie ? categorie.designation : '';
  }

  getEnumerationName(id: number): string {
    const enumeration = this.enumerations.find((e) => e.id === id);
    return enumeration ? enumeration.designation : '';
  }

  getStatutName(id: number): string {
    const statut = this.statuts.find((s) => s.id === id);
    return statut ? statut.designation : '';
  }

  getConcessionnaireName(id: number): string {
    const concessionnaire = this.concessionnaires.find((c) => c.id === id);
    return concessionnaire ? concessionnaire.designation : '';
  }
}
