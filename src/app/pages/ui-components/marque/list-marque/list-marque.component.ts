import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Marque {
  idMarque: number;
  nomMarque: string;
}

@Component({
  selector: 'app-list-marque',
  templateUrl: './list-marque.component.html',
  styleUrls: ['./list-marque.component.scss'],
})
export class ListMarqueComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['idMarque', 'nomMarque', 'actions'];
  marques: Marque[] = [
    {
      idMarque: 1,
      nomMarque: 'Marque 1',
    },
    {
      idMarque: 2,
      nomMarque: 'Marque 2',
    },
  ];

  selectedMarque: Marque;
  isEdit: boolean = false;
  marqueForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.marqueForm = this.fb.group({
      idMarque: [''],
      nomMarque: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.marqueForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(marque: Marque): void {
    this.isEdit = true;
    this.selectedMarque = marque;
    this.marqueForm.patchValue(marque);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderMarque(): void {
    if (this.isEdit) {
      Object.assign(this.selectedMarque, this.marqueForm.value);
    } else {
      this.marques.push(this.marqueForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(marque: Marque): void {
    this.selectedMarque = marque;
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
    this.marques = this.marques.filter((m) => m !== this.selectedMarque);
    this.fermerDialog();
  }
}
