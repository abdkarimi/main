import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Enumeration } from 'src/app/models/Enumeration';
import { EnumerationService } from 'src/app/services/enumeration/enumeration.service';


@Component({
  selector: 'app-list-enumeration',
  templateUrl: './list-enumeration.component.html',
  styleUrls: ['./list-enumeration.component.scss'],
})
export class ListEnumerationComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['idEnumeration', 'designationEnumeration', 'actions'];
  enumerations: MatTableDataSource<Enumeration> = new MatTableDataSource();
  selectedEnumeration: Enumeration;
  isEdit: boolean = false;
  enumerationForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private enumerationService: EnumerationService,
    private toastr: ToastrService
  ) {
    this.enumerationForm = this.fb.group({
      idEnumeration: [''],
      designationEnumeration: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEnumerations();
  }

  loadEnumerations() {
    this.enumerationService.getAllEnumerations().subscribe((data: Enumeration[]) => {
      this.enumerations.data = data;
      this.enumerations.paginator = this.paginator;
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.enumerations.filter = filterValue.trim().toLowerCase();
  }
  
  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.enumerationForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(enumeration: Enumeration): void {
    this.isEdit = true;
    this.selectedEnumeration = enumeration;
    this.enumerationForm.patchValue(enumeration);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderEnumeration(): void {
    if (this.enumerationForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire', 'Erreur');
      return;
    }

    const enumeration = this.enumerationForm.value;

    if (this.isEdit) {
      this.enumerationService.updateEnumeration(this.selectedEnumeration.idEnumeration, enumeration).subscribe(() => {
        this.toastr.success('Enumeration mise à jour avec succès', 'Succès');
        this.loadEnumerations();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de la mise à jour de l\'enumeration', 'Erreur');
      });
    } else {
      this.enumerationService.createEnumeration(enumeration).subscribe(() => {
        this.toastr.success('Enumeration ajoutée avec succès', 'Succès');
        this.loadEnumerations();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error("Erreur lors de l'ajout de l'enumeration", 'Erreur');
      });
    }
  }

  ouvrirDialogSuppression(enumeration: Enumeration): void {
    this.selectedEnumeration = enumeration;
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
    this.enumerationService.deleteEnumeration(this.selectedEnumeration.idEnumeration).subscribe(() => {
      this.toastr.success('Enumeration supprimée avec succès', 'Succès');
      this.loadEnumerations();
      this.fermerDialog();
    }, () => {
      this.toastr.error('Erreur lors de la suppression de l\'enumeration', 'Erreur');
    });
  }
}
