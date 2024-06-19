import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Garage } from 'src/app/models/garage';
import { GarageService } from 'src/app/services/garage/garage.service';


@Component({
  selector: 'app-list-garage',
  templateUrl: './list-garage.component.html',
  styleUrls: ['./list-garage.component.scss'],
})
export class ListGarageComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'nomGarage',
    'adresseGarage',
    'telGarage',
    'emailGarage',
    'faxGarage',
    'nomResponsableG',
    'gsmGarage',
    'actions',
  ];
  garages: MatTableDataSource<Garage> = new MatTableDataSource();
  selectedGarage: Garage;
  isEdit: boolean = false;
  garageForm: FormGroup;
  searchControl: FormControl = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private garageService: GarageService,
    private toastr: ToastrService
  ) {
    this.garageForm = this.fb.group({
      idGarage: [{ value: '', disabled: true }],
      nomGarage: ['', Validators.required],
      adresseGarage: ['', Validators.required],
      telGarage: ['', Validators.required],
      emailGarage: ['', [Validators.required, Validators.email]],
      faxGarage: [''],
      nomResponsableG: ['', Validators.required],
      gsmGarage: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadGarages();
    this.searchControl.valueChanges.subscribe(value => this.applyFilter(value));
  }

  loadGarages() {
    this.garageService.getAllGarages().subscribe((data: Garage[]) => {
      this.garages.data = data;
      this.garages.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.garages.filter = filterValue;
  }

  onPageChange(event: any) {
    this.garages.paginator = this.paginator;
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.garageForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(garage: Garage): void {
    this.isEdit = true;
    this.selectedGarage = garage;
    this.garageForm.patchValue(garage);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderGarage(): void {
    if (this.garageForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire', 'Erreur');
      return;
    }

    const garage = this.garageForm.getRawValue();

    if (this.isEdit) {
      this.garageService.updateGarage(this.selectedGarage.idGarage, garage).subscribe(() => {
        this.toastr.success('Garage mis à jour avec succès', 'Succès');
        this.loadGarages();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de la mise à jour du garage', 'Erreur');
      });
    } else {
      this.garageService.createGarage(garage).subscribe(() => {
        this.toastr.success('Garage ajouté avec succès', 'Succès');
        this.loadGarages();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de l\'ajout du garage', 'Erreur');
      });
    }
  }

  ouvrirDialogSuppression(garage: Garage): void {
    this.selectedGarage = garage;
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
    this.garageService.deleteGarage(this.selectedGarage.idGarage).subscribe(() => {
      this.toastr.success('Garage supprimé avec succès', 'Succès');
      this.loadGarages();
      this.fermerDialog();
    }, () => {
      this.toastr.error('Erreur lors de la suppression du garage', 'Erreur');
    });
  }
}
