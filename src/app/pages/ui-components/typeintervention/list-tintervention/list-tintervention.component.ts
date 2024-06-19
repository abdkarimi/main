import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TIntervention } from 'src/app/models/TIntervention';
import { TinterventionService } from 'src/app/services/TIntervention/tintervention.service';

@Component({
  selector: 'app-list-tintervention',
  templateUrl: './list-tintervention.component.html',
  styleUrls: ['./list-tintervention.component.scss'],
})
export class ListTInterventionComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'idTypeIntervention',
    'libelleTypeIntervention',
    'actions',
  ];
  typesIntervention: MatTableDataSource<TIntervention> =
    new MatTableDataSource();
  selectedIntervention: TIntervention;
  isEdit: boolean = false;
  interventionForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tinterventionService: TinterventionService,
    private toastr: ToastrService
  ) {
    this.interventionForm = this.fb.group({
      libelleTypeIntervention: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadInterventions();
    this.typesIntervention.paginator = this.paginator;
  }

  loadInterventions() {
    this.tinterventionService
      .getAllTypeInterventions()
      .subscribe((data: TIntervention[]) => {
        this.typesIntervention.data = data;
        this.typesIntervention.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.typesIntervention.filter = filterValue.trim().toLowerCase();

    if (this.typesIntervention.paginator) {
      this.typesIntervention.paginator.firstPage();
    }
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.interventionForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(intervention: TIntervention): void {
    this.isEdit = true;
    this.selectedIntervention = intervention;
    this.interventionForm.patchValue(intervention);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderIntervention(): void {
    if (this.interventionForm.invalid) {
      this.toastr.error(
        'Veuillez remplir correctement le formulaire',
        'Erreur'
      );
      return;
    }

    const intervention = this.interventionForm.value;

    if (this.isEdit) {
      this.tinterventionService
        .updateTypeIntervention(
          this.selectedIntervention.idTypeIntervention,
          intervention
        )
        .subscribe(
          () => {
            this.toastr.success(
              "Type d'intervention mis à jour avec succès",
              'Succès'
            );
            this.loadInterventions();
            this.dialog.closeAll();
          },
          () => {
            this.toastr.error(
              "Erreur lors de la mise à jour du type d'intervention",
              'Erreur'
            );
          }
        );
    } else {
      this.tinterventionService.createTypeIntervention(intervention).subscribe(
        () => {
          this.toastr.success(
            "Type d'intervention ajouté avec succès",
            'Succès'
          );
          this.loadInterventions();
          this.dialog.closeAll();
        },
        () => {
          this.toastr.error(
            "Erreur lors de l'ajout du type d'intervention",
            'Erreur'
          );
        }
      );
    }
  }

  ouvrirDialogSuppression(intervention: TIntervention): void {
    this.selectedIntervention = intervention;
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
    this.tinterventionService
      .deleteTypeIntervention(this.selectedIntervention.idTypeIntervention)
      .subscribe(
        () => {
          this.toastr.success(
            "Type d'intervention supprimé avec succès",
            'Succès'
          );
          this.loadInterventions();
          this.fermerDialog();
        },
        () => {
          this.toastr.error(
            "Erreur lors de la suppression du type d'intervention",
            'Erreur'
          );
        }
      );
  }
}
