import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CatVehicule } from 'src/app/models/CatVehicule';
import { CatvehiculeService } from 'src/app/services/CatVehicule/catvehicule.service';

@Component({
  selector: 'app-list-cat-vehicule',
  templateUrl: './list-cat-vehicule.component.html',
  styleUrls: ['./list-cat-vehicule.component.scss'],
})
export class ListCatVehiculeComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'idTypeVehicule',
    'libelleTypeVehicule',
    'actions',
  ];
  categories: MatTableDataSource<CatVehicule> = new MatTableDataSource();
  selectedCategorie: CatVehicule;
  isEdit: boolean = false;
  categorieForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private catvehiculeService: CatvehiculeService,
    private toastr: ToastrService
  ) {
    this.categorieForm = this.fb.group({
      libelleTypeVehicule: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.categories.paginator = this.paginator;
  }

  loadCategories() {
    this.catvehiculeService
      .getAllTypeVehicules()
      .subscribe((data: CatVehicule[]) => {
        this.categories.data = data;
        this.categories.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();

    if (this.categories.paginator) {
      this.categories.paginator.firstPage();
    }
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.categorieForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(categorie: CatVehicule): void {
    this.isEdit = true;
    this.selectedCategorie = categorie;
    this.categorieForm.patchValue(categorie);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderCategorie(): void {
    if (this.categorieForm.invalid) {
      this.toastr.error(
        'Veuillez remplir correctement le formulaire',
        'Erreur'
      );
      return;
    }

    const categorie = this.categorieForm.value;

    if (this.isEdit) {
      this.catvehiculeService
        .updateTypeVehicule(this.selectedCategorie.idTypeVehicule, categorie)
        .subscribe(
          () => {
            this.toastr.success(
              'Catégorie de véhicule mise à jour avec succès',
              'Succès'
            );
            this.loadCategories();
            this.dialog.closeAll();
          },
          () => {
            this.toastr.error(
              'Erreur lors de la mise à jour de la catégorie de véhicule',
              'Erreur'
            );
          }
        );
    } else {
      this.catvehiculeService.createTypeVehicule(categorie).subscribe(
        () => {
          this.toastr.success(
            'Catégorie de véhicule ajoutée avec succès',
            'Succès'
          );
          this.loadCategories();
          this.dialog.closeAll();
        },
        () => {
          this.toastr.error(
            "Erreur lors de l'ajout de la catégorie de véhicule",
            'Erreur'
          );
        }
      );
    }
  }

  ouvrirDialogSuppression(categorie: CatVehicule): void {
    this.selectedCategorie = categorie;
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
    this.catvehiculeService
      .deleteTypeVehicule(this.selectedCategorie.idTypeVehicule)
      .subscribe(
        () => {
          this.toastr.success(
            'Catégorie de véhicule supprimée avec succès',
            'Succès'
          );
          this.loadCategories();
          this.fermerDialog();
        },
        () => {
          this.toastr.error(
            'Erreur lors de la suppression de la catégorie de véhicule',
            'Erreur'
          );
        }
      );
  }
}
