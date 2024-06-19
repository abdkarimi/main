import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Concessionnaire } from 'src/app/models/Concessionnaire';
import { ConcessionnaireService } from 'src/app/services/Concessionnaire/concessionnaire.service';

@Component({
  selector: 'app-list-concessionnaire',
  templateUrl: './list-concessionnaire.component.html',
  styleUrls: ['./list-concessionnaire.component.scss'],
})
export class ListConcessionnaireComponent implements OnInit {
  @ViewChild('dialogAddEdit') dialogAddEdit: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['nomConcessionnaire', 'adresseConcessionnaire', 'telConcessionnaire', 'gsmConcessionnaire', 'faxConcessionnaire', 'email', 'actions'];
  concessionnaires: MatTableDataSource<Concessionnaire> = new MatTableDataSource();
  selectedConcessionnaire: Concessionnaire;
  isEdit: boolean = false;
  concessionnaireForm: FormGroup;
  searchControl: FormControl = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private concessionnaireService: ConcessionnaireService,
    private toastr: ToastrService
  ) {
    this.concessionnaireForm = this.fb.group({
      idConcessionnaire: [''],
      nomConcessionnaire: ['', Validators.required],
      adresseConcessionnaire: ['', Validators.required],
      telConcessionnaire: ['', Validators.required],
      gsmConcessionnaire: ['', Validators.required],
      faxConcessionnaire: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadConcessionnaires();
    this.searchControl.valueChanges.subscribe(value => this.applyFilter(value));
  }

  loadConcessionnaires() {
    this.concessionnaireService.getAllConcessionnaires().subscribe((data: Concessionnaire[]) => {
      this.concessionnaires.data = data;
      this.concessionnaires.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.concessionnaires.filter = filterValue;
  }

  openAddDialog(): void {
    this.isEdit = false;
    this.concessionnaireForm.reset();
    this.dialog.open(this.dialogAddEdit, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  openEditDialog(concessionnaire: Concessionnaire): void {
    this.isEdit = true;
    this.selectedConcessionnaire = concessionnaire;
    this.concessionnaireForm.patchValue(concessionnaire);
    this.dialog.open(this.dialogAddEdit, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  saveConcessionnaire(): void {
    if (this.concessionnaireForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire', 'Erreur');
      return;
    }

    const concessionnaire = this.concessionnaireForm.value;

    if (this.isEdit) {
      this.concessionnaireService.updateConcessionnaire(this.selectedConcessionnaire.idConcessionnaire, concessionnaire).subscribe(() => {
        this.toastr.success('Concessionnaire mis à jour avec succès', 'Succès');
        this.loadConcessionnaires();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de la mise à jour du concessionnaire', 'Erreur');
      });
    } else {
      this.concessionnaireService.createConcessionnaire(concessionnaire).subscribe(() => {
        this.toastr.success('Concessionnaire ajouté avec succès', 'Succès');
        this.loadConcessionnaires();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error("Erreur lors de l'ajout du concessionnaire", 'Erreur');
      });
    }
  }

  openDeleteDialog(concessionnaire: Concessionnaire): void {
    this.selectedConcessionnaire = concessionnaire;
    this.dialog.open(this.dialogDelete, {
      width: '400px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  confirmDelete(): void {
    this.concessionnaireService.deleteConcessionnaire(this.selectedConcessionnaire.idConcessionnaire).subscribe(() => {
      this.toastr.success('Concessionnaire supprimé avec succès', 'Succès');
      this.loadConcessionnaires();
      this.closeDialog();
    }, () => {
      this.toastr.error('Erreur lors de la suppression du concessionnaire', 'Erreur');
    });
  }
}
