import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Accident {
  dateAccident: Date;
  description: string;
  lieuAccident: string;
  datePV: Date;
  conducteur: number;
  pv: string;
  dossierPhoto: string;
}

interface Agent {
  matricule: number;
  nom: string;
  prenom: string;
}

@Component({
  selector: 'app-list-accident',
  templateUrl: './list-accident.component.html',
  styleUrls: ['./list-accident.component.scss'],
})
export class ListAccidentComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = [
    'dateAccident',
    'description',
    'lieuAccident',
    'datePV',
    'conducteur',
    'pv',
    'dossierPhoto',
    'actions',
  ];
  accidents: Accident[] = [
    {
      dateAccident: new Date('2023-01-01'),
      description: 'Accident mineur',
      lieuAccident: 'Paris',
      datePV: new Date('2023-01-05'),
      conducteur: 1,
      pv: '/assets/pv1.pdf',
      dossierPhoto: '/assets/photos1.pdf',
    },
    {
      dateAccident: new Date('2023-05-15'),
      description: 'Accident majeur',
      lieuAccident: 'Lyon',
      datePV: new Date('2023-05-20'),
      conducteur: 2,
      pv: '/assets/pv2.pdf',
      dossierPhoto: '/assets/photos2.pdf',
    },
  ];

  agents: Agent[] = [
    { matricule: 1, nom: 'Dupont', prenom: 'Jean' },
    { matricule: 2, nom: 'Martin', prenom: 'Marie' },
  ];

  selectedAccident: Accident;
  isEdit: boolean = false;
  accidentForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.accidentForm = this.fb.group({
      dateAccident: [''],
      description: [''],
      lieuAccident: [''],
      datePV: [''],
      conducteur: [''],
      pv: [''],
      dossierPhoto: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.accidentForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(accident: Accident): void {
    this.isEdit = true;
    this.selectedAccident = accident;
    this.accidentForm.patchValue(accident);
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  onFileSelected(event: Event, field: string): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.accidentForm.patchValue({ [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  sauvegarderAccident(): void {
    if (this.isEdit) {
      Object.assign(this.selectedAccident, this.accidentForm.value);
    } else {
      this.accidents.push(this.accidentForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(accident: Accident): void {
    this.selectedAccident = accident;
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
    this.accidents = this.accidents.filter((a) => a !== this.selectedAccident);
    this.fermerDialog();
  }

  getAgentName(matricule: number): string {
    const agent = this.agents.find((a) => a.matricule === matricule);
    return agent ? `${agent.nom} ${agent.prenom}` : '';
  }
}
