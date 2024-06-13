import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Statut {
  designation: string;
  observations: string;
}
@Component({
  selector: 'app-list-statut',
  templateUrl: './list-statut.component.html',
  styleUrls: ['./list-statut.component.scss'],
})
export class ListStatutComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['designation', 'observations', 'actions'];
  statuts: Statut[] = [
    {
      designation: 'Statut 1',
      observations: 'Observation 1',
    },
    {
      designation: 'Statut 2',
      observations: 'Observation 2',
    },
  ];

  selectedStatut: Statut;
  isEdit: boolean = false;
  statutForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.statutForm = this.fb.group({
      designation: [''],
      observations: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.statutForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(statut: Statut): void {
    this.isEdit = true;
    this.selectedStatut = statut;
    this.statutForm.patchValue(statut);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderStatut(): void {
    if (this.isEdit) {
      Object.assign(this.selectedStatut, this.statutForm.value);
    } else {
      this.statuts.push(this.statutForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(statut: Statut): void {
    this.selectedStatut = statut;
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
    this.statuts = this.statuts.filter((s) => s !== this.selectedStatut);
    this.fermerDialog();
  }
}
