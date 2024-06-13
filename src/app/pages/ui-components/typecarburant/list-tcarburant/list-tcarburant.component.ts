import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Carburant {
  id: string;
  designation: string;
}

@Component({
  selector: 'app-list-tcarburant',
  templateUrl: './list-tcarburant.component.html',
  styleUrls: ['./list-tcarburant.component.scss'],
})
export class ListTCarburantComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['id', 'designation', 'actions'];
  carburants: Carburant[] = [
    {
      id: '1',
      designation: 'Essence',
    },
    {
      id: '2',
      designation: 'Diesel',
    },
  ];

  selectedCarburant: Carburant;
  isEdit: boolean = false;
  carburantForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.carburantForm = this.fb.group({
      id: [''],
      designation: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.carburantForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(carburant: Carburant): void {
    this.isEdit = true;
    this.selectedCarburant = carburant;
    this.carburantForm.patchValue(carburant);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderCarburant(): void {
    if (this.isEdit) {
      Object.assign(this.selectedCarburant, this.carburantForm.value);
    } else {
      this.carburants.push(this.carburantForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(carburant: Carburant): void {
    this.selectedCarburant = carburant;
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
    this.carburants = this.carburants.filter(
      (c) => c !== this.selectedCarburant
    );
    this.fermerDialog();
  }
}
