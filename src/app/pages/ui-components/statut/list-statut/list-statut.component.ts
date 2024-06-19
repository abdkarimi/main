import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Statut } from 'src/app/models/Statut';
import { StatutService } from 'src/app/services/statut/statut.service';

@Component({
  selector: 'app-list-statut',
  templateUrl: './list-statut.component.html',
  styleUrls: ['./list-statut.component.scss'],
})
export class ListStatutComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['designationStatut', 'observations', 'actions'];
  statuts: MatTableDataSource<Statut> = new MatTableDataSource();
  selectedStatut: Statut;
  isEdit: boolean = false;
  statutForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private statutService: StatutService,
    private toastr: ToastrService
  ) {
    this.statutForm = this.fb.group({
      idStatut: [''],
      designationStatut: ['', Validators.required],
      observations: ['']
    });
  }

  ngOnInit(): void {
    this.loadStatuts();
    this.statuts.paginator = this.paginator;
  }

  loadStatuts() {
    this.statutService.getAllStatuts().subscribe((data: Statut[]) => {
      this.statuts.data = data;
      this.statuts.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.statuts.filter = filterValue.trim().toLowerCase();

    if (this.statuts.paginator) {
      this.statuts.paginator.firstPage();
    }
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.statutForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(statut: Statut): void {
    this.isEdit = true;
    this.selectedStatut = statut;
    this.statutForm.patchValue(statut);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderStatut(): void {
    if (this.statutForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire', 'Erreur');
      return;
    }

    const statut = this.statutForm.value;

    if (this.isEdit) {
      this.statutService.updateStatut(this.selectedStatut.idStatut, statut).subscribe(() => {
        this.toastr.success('Statut mis à jour avec succès', 'Succès');
        this.loadStatuts();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de la mise à jour du statut', 'Erreur');
      });
    } else {
      this.statutService.createStatut(statut).subscribe(() => {
        this.toastr.success('Statut ajouté avec succès', 'Succès');
        this.loadStatuts();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error("Erreur lors de l'ajout du statut", 'Erreur');
      });
    }
  }

  ouvrirDialogSuppression(statut: Statut): void {
    this.selectedStatut = statut;
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
    this.statutService.deleteStatut(this.selectedStatut.idStatut).subscribe(() => {
      this.toastr.success('Statut supprimé avec succès', 'Succès');
      this.loadStatuts();
      this.fermerDialog();
    }, () => {
      this.toastr.error('Erreur lors de la suppression du statut', 'Erreur');
    });
  }
}
