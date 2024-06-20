import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

interface Tache {
  tache: string;
  detail: string;
}

interface Intervention {
  objet: string;
  date: Date;
  typeIntervention: number;
  montant: number;
  kilometrage: number;
  garage: number;
  serviceFait: string;
  taches: Tache[];
}

interface TypeIntervention {
  id: number;
  designation: string;
}

interface Garage {
  id: number;
  designation: string;
}

@Component({
  selector: 'app-list-intervention',
  templateUrl: './list-intervention.component.html',
  styleUrls: ['./list-intervention.component.scss'],
})
export class ListInterventionComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild('dialogDetails') dialogDetails: TemplateRef<any>;

  displayedColumns: string[] = [
    'objet',
    'date',
    'typeIntervention',
    'montant',
    'kilometrage',
    'garage',
    'serviceFait',
    'actions',
  ];
  interventions: Intervention[] = [
    {
      objet: 'Révision complète',
      date: new Date('2023-06-01'),
      typeIntervention: 1,
      montant: 1500,
      kilometrage: 10000,
      garage: 1,
      serviceFait: 'Oui',
      taches: [
        { tache: 'Vidange', detail: "Changement d'huile et filtre à huile" },
        { tache: 'Pneus', detail: 'Remplacement des pneus avant' },
      ],
    },
    {
      objet: 'Réparation frein',
      date: new Date('2023-07-15'),
      typeIntervention: 2,
      montant: 200,
      kilometrage: 5000,
      garage: 2,
      serviceFait: 'Non',
      taches: [
        {
          tache: 'Plaquettes de frein',
          detail: 'Changement des plaquettes de frein avant',
        },
        {
          tache: 'Disques de frein',
          detail: 'Changement des disques de frein arrière',
        },
      ],
    },
  ];

  typesIntervention: TypeIntervention[] = [
    { id: 1, designation: 'Révision' },
    { id: 2, designation: 'Réparation' },
  ];

  garages: Garage[] = [
    { id: 1, designation: 'Garage A' },
    { id: 2, designation: 'Garage B' },
  ];

  serviceFaitOptions: string[] = ['Encours', 'Oui', 'Non'];

  selectedIntervention: Intervention;
  isEdit: boolean = false;
  interventionForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.interventionForm = this.fb.group({
      objet: [''],
      date: [''],
      typeIntervention: [''],
      montant: [''],
      kilometrage: [''],
      garage: [''],
      serviceFait: [''],
      taches: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get taches(): FormArray {
    return this.interventionForm.get('taches') as FormArray;
  }

  ajouterTache(): void {
    const tacheFormGroup = this.fb.group({
      tache: [''],
      detail: [''],
    });
    this.taches.push(tacheFormGroup);
  }

  supprimerTache(index: number): void {
    this.taches.removeAt(index);
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.interventionForm.reset();
    this.taches.clear();
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
    this.taches.clear();
    intervention.taches.forEach((tache) => {
      const tacheFormGroup = this.fb.group({
        tache: [tache.tache],
        detail: [tache.detail],
      });
      this.taches.push(tacheFormGroup);
    });
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderIntervention(): void {
    if (this.isEdit) {
      Object.assign(this.selectedIntervention, this.interventionForm.value);
    } else {
      this.interventions.push(this.interventionForm.value);
    }
    this.dialog.closeAll();
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

  ouvrirDialogDetails(intervention: Intervention): void {
    this.selectedIntervention = intervention;
    this.dialog.open(this.dialogDetails, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
  }

  confirmerSuppression(): void {
    this.interventions = this.interventions.filter(
      (i) => i !== this.selectedIntervention
    );
    this.fermerDialog();
  }

  getTypeInterventionName(typeInterventionId: number): string {
    const type = this.typesIntervention.find(
      (t) => t.id === typeInterventionId
    );
    return type ? type.designation : '';
  }

  getGarageName(garageId: number): string {
    const garage = this.garages.find((g) => g.id === garageId);
    return garage ? garage.designation : '';
  }
}
