import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-supprimer-compagnie',
  templateUrl: './supprimer-compagnie.component.html',
  styleUrls: ['./supprimer-compagnie.component.scss']
})
export class SupprimerCompagnieComponent {
  constructor(public dialog: MatDialog) { }
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];


  selectedStates = this.states;

  onKey(value: string) {
    this.selectedStates = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.states.filter(option => option.toLowerCase().startsWith(filter));
  }
  DialogElement() {
    this.dialog.open(DialogAnimationsElementComponent);
  }
}
@Component({
  selector: 'app-dialog-animations',
  template: `
<div class="mdc-dialog__container">
    <div class="mat-mdc-dialog-surface mdc-dialog__surface">
        <h2 mat-dialog-title="" class="mat-mdc-dialog-title mdc-dialog__title" id="mat-mdc-dialog-title-9">Supprimer</h2>
        <div class="p-x-24 p-b-24 ng-star-inserted"> Sure to delete <span class="f-w-600">Sed ut perspiciatis unde omnis
                iste</span>?
        </div>
        <div mat-dialog-actions class="mat-mdc-dialog-actions mdc-dialog__actions p-24 p-t-0">
            <button mat-flat-button="" color="primary" mat-ripple-loader-class-name="mat-mdc-button-ripple"
                class="mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-primary mat-mdc-button-base">
                <span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                <span class="mdc-button__label"> Supprimer </span>
                <span class="mat-mdc-focus-indicator"></span>
                <span class="mat-mdc-button-touch-target"></span>
                <span class="mat-ripple mat-mdc-button-ripple"></span>
            </button>
            <button mat-stroked-button="" color="warn" mat-ripple-loader-class-name="mat-mdc-button-ripple"
                class="mdc-button mdc-button--outlined mat-mdc-outlined-button mat-warn mat-mdc-button-base" (click)="closeDialog()">
                <span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                <span class="mdc-button__label"> Cancel </span>
                <span class="mat-mdc-focus-indicator"></span>
                <span class="mat-mdc-button-touch-target"></span>
                <span class="mat-ripple mat-mdc-button-ripple"></span>
            </button>
        </div>
    </div>
</div>
  `
})
export class DialogAnimationsElementComponent {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsElementComponent>) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
}

