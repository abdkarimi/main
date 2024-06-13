import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Compagnie {
  nom: string;
  adresse: string;
  tel: string;
  email: string;
  fax: string;
  nomresp: string;
  gsmresp: string;
}

@Component({
  selector: 'app-list-compagnie',
  templateUrl: './list-compagnie.component.html',
  styleUrls: ['./list-compagnie.component.scss'],
})
export class ListCompagnieComponent implements OnInit {
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
  compagnies: Compagnie[] = [
    {
      nom: 'Compagnie 1',
      adresse: 'Adresse 1',
      tel: '0123456789',
      email: 'email1@example.com',
      fax: '0123456789',
      nomresp: 'repsonsable1',
      gsmresp: '0123456789',
    },
    {
      nom: 'Compagnie 2',
      adresse: 'Adresse 2',
      tel: '0123456789',
      email: 'email2@example.com',
      fax: '0123456789',
      nomresp: 'repsonsable2',
      gsmresp: '0123456789',
    },
  ];

  selectedCompagnie: Compagnie;
  isEdit: boolean = false;
  compagnieForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.compagnieForm = this.fb.group({
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
    this.compagnieForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(compagnie: Compagnie): void {
    this.isEdit = true;
    this.selectedCompagnie = compagnie;
    this.compagnieForm.patchValue(compagnie);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderCompagnie(): void {
    if (this.isEdit) {
      Object.assign(this.selectedCompagnie, this.compagnieForm.value);
    } else {
      this.compagnies.push(this.compagnieForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(compagnie: Compagnie): void {
    this.selectedCompagnie = compagnie;
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
    this.compagnies = this.compagnies.filter(
      (c) => c !== this.selectedCompagnie
    );
    this.fermerDialog();
  }
}
