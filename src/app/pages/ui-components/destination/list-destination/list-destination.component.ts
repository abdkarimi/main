import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Destination {
  id: number;
  designation: string;
}

@Component({
  selector: 'app-list-destination',
  templateUrl: './list-destination.component.html',
  styleUrls: ['./list-destination.component.scss'],
})
export class ListDestinationComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['id', 'designation', 'actions'];
  destinations: Destination[] = [
    {
      id: 1,
      designation: 'Boujdour',
    },
    {
      id: 2,
      designation: 'Tarfaya',
    },
    {
      id: 3,
      designation: 'Es-Smara',
    },
    {
      id: 4,
      designation: 'El Marsa',
    },
    {
      id: 5,
      designation: 'Foum El Oued',
    },
    {
      id: 6,
      designation: 'Rabat',
    },
  ];

  selectedDestination: Destination;
  isEdit: boolean = false;
  destinationForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.destinationForm = this.fb.group({
      id: [''],
      designation: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.destinationForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(destination: Destination): void {
    this.isEdit = true;
    this.selectedDestination = destination;
    this.destinationForm.patchValue(destination);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderDestination(): void {
    if (this.isEdit) {
      Object.assign(this.selectedDestination, this.destinationForm.value);
    } else {
      this.destinations.push(this.destinationForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(destination: Destination): void {
    this.selectedDestination = destination;
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
    this.destinations = this.destinations.filter(
      (d) => d !== this.selectedDestination
    );
    this.fermerDialog();
  }
}
