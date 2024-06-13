import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Categorie {
  id: string;
  designation: string;
}

@Component({
  selector: 'app-list-cat-vehicule',
  templateUrl: './list-cat-vehicule.component.html',
  styleUrls: ['./list-cat-vehicule.component.scss'],
})
export class ListCatVehiculeComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['id', 'designation', 'actions'];
  categories: Categorie[] = [
    {
      id: '1',
      designation: 'SUV',
    },
    {
      id: '2',
      designation: 'Berline',
    },
  ];

  selectedCategorie: Categorie;
  isEdit: boolean = false;
  categorieForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.categorieForm = this.fb.group({
      id: [''],
      designation: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.categorieForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(categorie: Categorie): void {
    this.isEdit = true;
    this.selectedCategorie = categorie;
    this.categorieForm.patchValue(categorie);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderCategorie(): void {
    if (this.isEdit) {
      Object.assign(this.selectedCategorie, this.categorieForm.value);
    } else {
      this.categories.push(this.categorieForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(categorie: Categorie): void {
    this.selectedCategorie = categorie;
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
    this.categories = this.categories.filter(
      (c) => c !== this.selectedCategorie
    );
    this.fermerDialog();
  }
}
