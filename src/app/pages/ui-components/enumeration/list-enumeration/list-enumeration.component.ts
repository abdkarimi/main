import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OptionIcons } from 'angular-tabler-icons/lib/options.interfaces';

interface Enumeration {
  id: number;
  designation: string;
}

@Component({
  selector: 'app-list-enumeration',
  templateUrl: './list-enumeration.component.html',
  styleUrls: ['./list-enumeration.component.scss'],
})
export class ListEnumerationComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['id', 'designation', 'actions'];
  enumerations: Enumeration[] = [
    {
      id: 1,
      designation: 'Enumeration 1',
    },
    {
      id: 2,
      designation: 'Enumeration 2',
    },
  ];

  selectedEnumeration: Enumeration;
  isEdit: boolean = false;
  enumerationForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.enumerationForm = this.fb.group({
      id: [''],
      designation: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.enumerationForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(enumeration: Enumeration): void {
    this.isEdit = true;
    this.selectedEnumeration = enumeration;
    this.enumerationForm.patchValue(enumeration);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderEnumeration(): void {
    if (this.isEdit) {
      Object.assign(this.selectedEnumeration, this.enumerationForm.value);
    } else {
      this.enumerations.push(this.enumerationForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(enumeration: Enumeration): void {
    this.selectedEnumeration = enumeration;
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
    this.enumerations = this.enumerations.filter(
      (e) => e !== this.selectedEnumeration
    );
    this.fermerDialog();
  }
}
