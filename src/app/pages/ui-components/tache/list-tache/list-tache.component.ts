import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Tache } from 'src/app/models/Tache';
import { TacheService } from 'src/app/services/tache/tache.service';

@Component({
  selector: 'app-list-tache',
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.scss']
})
export class ListTacheComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['libelleTache', 'prixHTTache', 'tvaTache', 'prixTTC', 'actions'];
  taches: MatTableDataSource<Tache> = new MatTableDataSource();
  selectedTache: Tache;
  isEdit: boolean = false;
  tacheForm: FormGroup;
  searchControl: FormControl = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tacheService: TacheService,
    private toastr: ToastrService
  ) {
    this.tacheForm = this.fb.group({
      idTache: [{ value: '', disabled: true }],
      libelleTache: ['', Validators.required],
      prixHTTache: ['', Validators.required],
      tvaTache: ['', Validators.required],
      prixTTC: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTaches();
    this.searchControl.valueChanges.subscribe((value) => this.applyFilter(value));
  }

  loadTaches() {
    this.tacheService.getAllTaches().subscribe((data: Tache[]) => {
      this.taches.data = data;
      this.taches.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.taches.filter = filterValue;
  }

  onPageChange(event: any) {
    this.taches.paginator = this.paginator;
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.tacheForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(tache: Tache): void {
    this.isEdit = true;
    this.selectedTache = tache;
    this.tacheForm.patchValue(tache);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderTache(): void {
    if (this.tacheForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire', 'Erreur');
      return;
    }

    const tache = this.tacheForm.getRawValue();

    if (this.isEdit) {
      this.tacheService.updateTache(this.selectedTache.idTache, tache).subscribe(
        () => {
          this.toastr.success('Tâche mise à jour avec succès', 'Succès');
          this.loadTaches();
          this.dialog.closeAll();
        },
        () => {
          this.toastr.error('Erreur lors de la mise à jour de la tâche', 'Erreur');
        }
      );
    } else {
      this.tacheService.createTache(tache).subscribe(
        () => {
          this.toastr.success('Tâche ajoutée avec succès', 'Succès');
          this.loadTaches();
          this.dialog.closeAll();
        },
        () => {
          this.toastr.error("Erreur lors de l'ajout de la tâche", 'Erreur');
        }
      );
    }
  }

  ouvrirDialogSuppression(tache: Tache): void {
    this.selectedTache = tache;
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
    this.tacheService.deleteTache(this.selectedTache.idTache).subscribe(
      () => {
        this.toastr.success('Tâche supprimée avec succès', 'Succès');
        this.loadTaches();
        this.fermerDialog();
      },
      () => {
        this.toastr.error('Erreur lors de la suppression de la tâche', 'Erreur');
      }
    );
  }
}
