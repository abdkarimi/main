import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TCarburant } from 'src/app/models/TCarburant';
import { TcarburantService } from 'src/app/services/TCarburant/tcarburant.service';

@Component({
  selector: 'app-list-tcarburant',
  templateUrl: './list-tcarburant.component.html',
  styleUrls: ['./list-tcarburant.component.scss'],
})
export class ListTCarburantComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['idTypeCarburant', 'libelleTypeCarburant', 'actions'];
  carburants: MatTableDataSource<TCarburant> = new MatTableDataSource();
  selectedCarburant: TCarburant;
  isEdit: boolean = false;
  carburantForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tcarburantService: TcarburantService,
    private toastr: ToastrService
  ) {
    this.carburantForm = this.fb.group({
      idTypeCarburant: [''],
      libelleTypeCarburant: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCarburants();
    this.carburants.paginator = this.paginator;
  }

  loadCarburants() {
    this.tcarburantService.getAllTypeCarburants().subscribe((data: TCarburant[]) => {
      this.carburants.data = data;
      this.carburants.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.carburants.filter = filterValue.trim().toLowerCase();

    if (this.carburants.paginator) {
      this.carburants.paginator.firstPage();
    }
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.carburantForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(carburant: TCarburant): void {
    this.isEdit = true;
    this.selectedCarburant = carburant;
    this.carburantForm.patchValue(carburant);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderCarburant(): void {
    if (this.carburantForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire', 'Erreur');
      return;
    }

    const carburant = this.carburantForm.value;

    if (this.isEdit) {
      this.tcarburantService.updateTypeCarburant(this.selectedCarburant.idTypeCarburant, carburant).subscribe(() => {
        this.toastr.success('Type de carburant mis à jour avec succès', 'Succès');
        this.loadCarburants();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de la mise à jour du type de carburant', 'Erreur');
      });
    } else {
      this.tcarburantService.createTypeCarburant(carburant).subscribe(() => {
        this.toastr.success('Type de carburant ajouté avec succès', 'Succès');
        this.loadCarburants();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error("Erreur lors de l'ajout du type de carburant", 'Erreur');
      });
    }
  }

  ouvrirDialogSuppression(carburant: TCarburant): void {
    this.selectedCarburant = carburant;
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
    this.tcarburantService.deleteTypeCarburant(this.selectedCarburant.idTypeCarburant).subscribe(() => {
      this.toastr.success('Type de carburant supprimé avec succès', 'Succès');
      this.loadCarburants();
      this.fermerDialog();
    }, () => {
      this.toastr.error('Erreur lors de la suppression du type de carburant', 'Erreur');
    });
  }
}
