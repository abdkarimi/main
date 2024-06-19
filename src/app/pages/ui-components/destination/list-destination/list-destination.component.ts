import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Destination } from 'src/app/models/Destination';
import { DestinationService } from 'src/app/services/Destination/destination.service';

@Component({
  selector: 'app-list-destination',
  templateUrl: './list-destination.component.html',
  styleUrls: ['./list-destination.component.scss'],
})
export class ListDestinationComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['idDestination', 'libelleDestination', 'actions'];
  destinations: MatTableDataSource<Destination> = new MatTableDataSource();
  selectedDestination: Destination;
  isEdit: boolean = false;
  destinationForm: FormGroup;
  searchControl: FormControl = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private destinationService: DestinationService,
    private toastr: ToastrService
  ) {
    this.destinationForm = this.fb.group({
      idDestination: [''],
      libelleDestination: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDestinations();
    this.searchControl.valueChanges.subscribe(value => this.applyFilter(value));
  }

  loadDestinations() {
    this.destinationService.getAllDestinations().subscribe((data: Destination[]) => {
      this.destinations.data = data;
      this.destinations.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.destinations.filter = filterValue;
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.destinationForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(destination: Destination): void {
    this.isEdit = true;
    this.selectedDestination = destination;
    this.destinationForm.patchValue(destination);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderDestination(): void {
    if (this.destinationForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire', 'Erreur');
      return;
    }

    const destination = this.destinationForm.value;

    if (this.isEdit) {
      this.destinationService.updateDestination(this.selectedDestination.idDestination, destination).subscribe(() => {
        this.toastr.success('Destination mise à jour avec succès', 'Succès');
        this.loadDestinations();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de la mise à jour de la destination', 'Erreur');
      });
    } else {
      this.destinationService.createDestination(destination).subscribe(() => {
        this.toastr.success('Destination ajoutée avec succès', 'Succès');
        this.loadDestinations();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error("Erreur lors de l'ajout de la destination", 'Erreur');
      });
    }
  }

  ouvrirDialogSuppression(destination: Destination): void {
    this.selectedDestination = destination;
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
    this.destinationService.deleteDestination(this.selectedDestination.idDestination).subscribe(() => {
      this.toastr.success('Destination supprimée avec succès', 'Succès');
      this.loadDestinations();
      this.fermerDialog();
    }, () => {
      this.toastr.error('Erreur lors de la suppression de la destination', 'Erreur');
    });
  }
}
