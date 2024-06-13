import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Concessionnaire {
  nom: string;
  adresse: string;
  tel: string;
  gsm: string;
  fax: string;
  email: string;
}

@Component({
  selector: 'app-list-concessionnaire',
  templateUrl: './list-concessionnaire.component.html',
  styleUrls: ['./list-concessionnaire.component.scss'],
})
export class ListConcessionnaireComponent implements OnInit {
  @ViewChild('dialogAddEdit') dialogAddEdit: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  displayedColumns: string[] = ['nom', 'adresse', 'tel', 'gsm', 'fax', 'email', 'actions'];
  concessionnaires: Concessionnaire[] = [
    {
      nom: 'Concessionnaire 1',
      adresse: 'Adresse 1',
      tel: '0123456789',
      gsm: '0612345678',
      fax: '0123456789',
      email: 'email1@example.com',
    },
    {
      nom: 'Concessionnaire 2',
      adresse: 'Adresse 2',
      tel: '0123456789',
      gsm: '0612345678',
      fax: '0123456789',
      email: 'email2@example.com',
    },
  ];

  selectedConcessionnaire: Concessionnaire;
  isEdit: boolean = false;
  concessionnaireForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.concessionnaireForm = this.fb.group({
      nom: [''],
      adresse: [''],
      tel: [''],
      gsm: [''],
      fax: [''],
      email: ['']
    });
  }

  ngOnInit(): void {}

  openAddDialog(): void {
    this.isEdit = false;
    this.concessionnaireForm.reset();
    this.dialog.open(this.dialogAddEdit, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms'
    });
  }

  openEditDialog(concessionnaire: Concessionnaire): void {
    this.isEdit = true;
    this.selectedConcessionnaire = concessionnaire;
    this.concessionnaireForm.patchValue(concessionnaire);
    this.dialog.open(this.dialogAddEdit, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms'
    });
  }

  saveConcessionnaire(): void {
    if (this.isEdit) {
      Object.assign(this.selectedConcessionnaire, this.concessionnaireForm.value);
    } else {
      this.concessionnaires.push(this.concessionnaireForm.value);
    }
    this.dialog.closeAll();
  }

  openDeleteDialog(concessionnaire: Concessionnaire): void {
    this.selectedConcessionnaire = concessionnaire;
    this.dialog.open(this.dialogDelete, {
      width: '400px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms'
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  confirmDelete(): void {
    this.concessionnaires = this.concessionnaires.filter(c => c !== this.selectedConcessionnaire);
    this.closeDialog();
  }
}
