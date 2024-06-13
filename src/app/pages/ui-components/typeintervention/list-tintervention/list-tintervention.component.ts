import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface TypeIntervention {
  id: string;
  designation: string;
}

@Component({
  selector: 'app-list-tintervention',
  templateUrl: './list-tintervention.component.html',
  styleUrls: ['./list-tintervention.component.scss'],
})
export class ListTInterventionComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['id', 'designation', 'actions'];
  typesIntervention: TypeIntervention[] = [
    {
      id: '1',
      designation: 'Réparation Mécanique',
    },
    {
      id: '2',
      designation: 'Entretien',
    },
  ];

  selectedIntervention: TypeIntervention;
  isEdit: boolean = false;
  interventionForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.interventionForm = this.fb.group({
      id: [''],
      designation: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.interventionForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(intervention: TypeIntervention): void {
    this.isEdit = true;
    this.selectedIntervention = intervention;
    this.interventionForm.patchValue(intervention);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderIntervention(): void {
    if (this.isEdit) {
      Object.assign(this.selectedIntervention, this.interventionForm.value);
    } else {
      this.typesIntervention.push(this.interventionForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(intervention: TypeIntervention): void {
    this.selectedIntervention = intervention;
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
    this.typesIntervention = this.typesIntervention.filter(
      (t) => t !== this.selectedIntervention
    );
    this.fermerDialog();
  }
}
