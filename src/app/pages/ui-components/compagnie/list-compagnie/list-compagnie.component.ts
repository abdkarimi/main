import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Compagnie } from 'src/app/models/Compagnie';
import { CompagnieService } from 'src/app/services/compagnie/compagnie.service';

@Component({
  selector: 'app-list-compagnie',
  templateUrl: './list-compagnie.component.html',
  styleUrls: ['./list-compagnie.component.scss'],
})
export class ListCompagnieComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'nomCompagnie',
    'adresseCompagnie',
    'telCompagnie',
    'emailCompagnie',
    'faxCompagnie',
    'nomResponsableC',
    'gsmResponsableC',
    'actions',
  ];
  compagnies: MatTableDataSource<Compagnie> = new MatTableDataSource();
  selectedCompagnie: Compagnie;
  isEdit: boolean = false;
  compagnieForm: FormGroup;
  searchControl: FormControl = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private compagnieService: CompagnieService,
    private toastr: ToastrService
  ) {
    this.compagnieForm = this.fb.group({
      idCompagnie: [{ value: '', disabled: true }],
      nomCompagnie: ['', Validators.required],
      adresseCompagnie: ['', Validators.required],
      telCompagnie: ['', Validators.required],
      emailCompagnie: ['', [Validators.required, Validators.email]],
      faxCompagnie: [''],
      nomResponsableC: ['', Validators.required],
      gsmResponsableC: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCompagnies();
    this.searchControl.valueChanges.subscribe((value) =>
      this.applyFilter(value)
    );
  }

  loadCompagnies() {
    this.compagnieService.getAllCompagnies().subscribe((data: Compagnie[]) => {
      this.compagnies.data = data;
      this.compagnies.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.compagnies.filter = filterValue;
  }

  onPageChange(event: any) {
    this.compagnies.paginator = this.paginator;
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.compagnieForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(compagnie: Compagnie): void {
    this.isEdit = true;
    this.selectedCompagnie = compagnie;
    this.compagnieForm.patchValue(compagnie);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderCompagnie(): void {
    if (this.compagnieForm.invalid) {
      this.toastr.error(
        'Veuillez remplir correctement le formulaire',
        'Erreur'
      );
      return;
    }

    const compagnie = this.compagnieForm.getRawValue();

    if (this.isEdit) {
      this.compagnieService
        .updateCompagnie(this.selectedCompagnie.idCompagnie, compagnie)
        .subscribe(
          () => {
            this.toastr.success('Compagnie mise à jour avec succès', 'Succès');
            this.loadCompagnies();
            this.dialog.closeAll();
          },
          () => {
            this.toastr.error(
              'Erreur lors de la mise à jour de la compagnie',
              'Erreur'
            );
          }
        );
    } else {
      this.compagnieService.createCompagnie(compagnie).subscribe(
        () => {
          this.toastr.success('Compagnie ajoutée avec succès', 'Succès');
          this.loadCompagnies();
          this.dialog.closeAll();
        },
        () => {
          this.toastr.error("Erreur lors de l'ajout de la compagnie", 'Erreur');
        }
      );
    }
  }

  ouvrirDialogSuppression(compagnie: Compagnie): void {
    this.selectedCompagnie = compagnie;
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
    this.compagnieService
      .deleteCompagnie(this.selectedCompagnie.idCompagnie)
      .subscribe(
        () => {
          this.toastr.success('Compagnie supprimée avec succès', 'Succès');
          this.loadCompagnies();
          this.fermerDialog();
        },
        () => {
          this.toastr.error(
            'Erreur lors de la suppression de la compagnie',
            'Erreur'
          );
        }
      );
  }
}
