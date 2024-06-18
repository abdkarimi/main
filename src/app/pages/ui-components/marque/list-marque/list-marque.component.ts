import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MarqueService } from 'src/app/services/marque/marque.service';
import { Marque } from 'src/app/models/Marque';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-marque',
  templateUrl: './list-marque.component.html',
  styleUrls: ['./list-marque.component.scss'],
})
export class ListMarqueComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['idMarque', 'nomMarque', 'actions'];
  marques: Marque[] = [];
  filteredMarques = new MatTableDataSource<Marque>();
  selectedMarque: Marque;
  isEdit: boolean = false;
  marqueForm: FormGroup;
  searchControl: FormControl = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private marqueService: MarqueService,
    private toastr: ToastrService
  ) {
    this.marqueForm = this.fb.group({
      idMarque: [{value: '', disabled: true}],
      libelleMarque: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadMarques();
    this.searchControl.valueChanges.subscribe(value => this.applyFilter(value));
  }

  loadMarques() {
    this.marqueService.getAllMarques().subscribe((data: Marque[]) => {
      this.marques = data;
      this.filteredMarques.data = this.marques;
      this.filteredMarques.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredMarques.filter = filterValue;
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.marqueForm.reset();
    this.marqueForm.get('idMarque')?.disable();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(marque: Marque): void {
    this.isEdit = true;
    this.selectedMarque = marque;
    this.marqueForm.patchValue(marque);
    this.marqueForm.get('idMarque')?.enable();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderMarque(): void {
    if (this.marqueForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire', 'Erreur');
      return;
    }

    const marque = this.marqueForm.getRawValue();

    if (this.isEdit) {
      this.marqueService.updateMarque(this.selectedMarque.idMarque, marque).subscribe(() => {
        this.toastr.success('Marque mise à jour avec succès', 'Succès');
        this.loadMarques();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de la mise à jour de la marque', 'Erreur');
      });
    } else {
      this.marqueService.createMarque(marque).subscribe(() => {
        this.toastr.success('Marque ajoutée avec succès', 'Succès');
        this.loadMarques();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de l\'ajout de la marque', 'Erreur');
      });
    }
  }

  ouvrirDialogSuppression(marque: Marque): void {
    this.selectedMarque = marque;
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
    this.marqueService.deleteMarque(this.selectedMarque.idMarque).subscribe(() => {
      this.toastr.success('Marque supprimée avec succès', 'Succès');
      this.loadMarques();
      this.fermerDialog();
    }, () => {
      this.toastr.error('Erreur lors de la suppression de la marque', 'Erreur');
    });
  }

  onPageChange(event: any) {
    this.filteredMarques.paginator = this.paginator;
  }
}
