import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Structure } from 'src/app/models/Structure';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StructureService } from 'src/app/services/Structure/structure.service';

@Component({
  selector: 'app-list-structure',
  templateUrl: './list-structure.component.html',
  styleUrls: ['./list-structure.component.scss'],
})
export class ListStructureComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['idStructure', 'nomStructure', 'structureParent', 'responsableStructure', 'actions'];
  structures: MatTableDataSource<Structure> = new MatTableDataSource();

  selectedStructure: Structure;
  isEdit: boolean = false;
  structureForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private structureService: StructureService
  ) {
    this.structureForm = this.fb.group({
      idStructure: [''],
      nomStructure: [''],
      structureParent: [''],
      responsableStructure: [''],
    });
  }

  ngOnInit(): void {
    this.loadStructures();
    this.structures.paginator = this.paginator;
  }

  loadStructures() {
    this.structureService.obtenirToutesStructures().subscribe((data: Structure[]) => {
      this.structures.data = data;
      this.structures.paginator = this.paginator;
    });
  }

  getStructureParentName(id: number): string {
    const structure = this.structures.data.find((s) => s.idStructure === id);
    return structure ? structure.nomStructure : '';
  }

  getAgentName(id: number): string {
    // Simulated agent name retrieval
    const agents = [
      { id: 1, nom: 'Jean Dupont' },
      { id: 2, nom: 'Marie Durand' },
    ];
    const agent = agents.find((a) => a.id === id);
    return agent ? agent.nom : '';
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.structureForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(structure: Structure): void {
    this.isEdit = true;
    this.selectedStructure = structure;
    this.structureForm.patchValue(structure);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderStructure(): void {
    if (this.isEdit) {
      this.structureService
        .mettreAJourStructure(this.selectedStructure.idStructure, this.structureForm.value)
        .subscribe(() => {
          this.loadStructures();
          this.dialog.closeAll();
        });
    } else {
      this.structureService.creerStructure(this.structureForm.value).subscribe(() => {
        this.loadStructures();
        this.dialog.closeAll();
      });
    }
  }

  ouvrirDialogSuppression(structure: Structure): void {
    this.selectedStructure = structure;
    this.dialog.open(this.dialogSuppression, {
      width: '400px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
  }

  confirmerSuppression(): void {
    this.structureService.supprimerStructure(this.selectedStructure.idStructure).subscribe(() => {
      this.loadStructures();
      this.fermerDialog();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.structures.filter = filterValue.trim().toLowerCase();

    if (this.structures.paginator) {
      this.structures.paginator.firstPage();
    }
  }
}
