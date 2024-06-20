import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Marque {
  idMarque: number;
  nom: string;
}
interface Modele {
  modele: string;
  marque: Marque;
}
@Component({
  selector: 'app-list-modele',
  templateUrl: './list-modele.component.html',
  styleUrls: ['./list-modele.component.scss'],
})
export class ListModeleComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['modele', 'marque', 'actions'];
  modeles: Modele[] = [
    {
      modele: 'Modèle 1',
      marque: { idMarque: 1, nom: 'Marque 1' },
    },
    {
      modele: 'Modèle 2',
      marque: { idMarque: 2, nom: 'Marque 2' },
    },
  ];

  marques: Marque[] = [
    { idMarque: 1, nom: 'Marque 1' },
    { idMarque: 2, nom: 'Marque 2' },
  ];

  selectedModele: Modele;
  isEdit: boolean = false;
  modeleForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.modeleForm = this.fb.group({
      modele: [''],
      marque: [null],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.modeleForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(modele: Modele): void {
    this.isEdit = true;
    this.selectedModele = modele;
    this.modeleForm.patchValue(modele);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderModele(): void {
    if (this.isEdit) {
      Object.assign(this.selectedModele, this.modeleForm.value);
    } else {
      this.modeles.push(this.modeleForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(modele: Modele): void {
    this.selectedModele = modele;
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
    this.modeles = this.modeles.filter((m) => m !== this.selectedModele);
    this.fermerDialog();
  }
}
