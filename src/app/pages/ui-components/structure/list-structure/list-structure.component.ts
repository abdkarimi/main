import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Structure {
  id: string;
  designation: string;
  structureParent: string;
  responsable: string;
}

interface Agent {
  id: string;
  nom: string;
}

@Component({
  selector: 'app-list-structure',
  templateUrl: './list-structure.component.html',
  styleUrls: ['./list-structure.component.scss'],
})
export class ListStructureComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = [
    'id',
    'designation',
    'structureParent',
    'responsable',
    'actions',
  ];
  structures: Structure[] = [
    {
      id: '1',
      designation: 'Direction Générale',
      structureParent: '',
      responsable: '1',
    },
    {
      id: '2',
      designation: 'Service Informatique',
      structureParent: '1',
      responsable: '2',
    },
  ];

  agents: Agent[] = [
    {
      id: '1',
      nom: 'Jean Dupont',
    },
    {
      id: '2',
      nom: 'Marie Durand',
    },
  ];

  selectedStructure: Structure;
  isEdit: boolean = false;
  structureForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.structureForm = this.fb.group({
      id: [''],
      designation: [''],
      structureParent: [''],
      responsable: [''],
    });
  }

  ngOnInit(): void {}

  getStructureParentName(id: string): string {
    const structure = this.structures.find((s) => s.id === id);
    return structure ? structure.designation : '';
  }

  getAgentName(id: string): string {
    const agent = this.agents.find((a) => a.id === id);
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
      Object.assign(this.selectedStructure, this.structureForm.value);
    } else {
      this.structures.push(this.structureForm.value);
    }
    this.dialog.closeAll();
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
    this.structures = this.structures.filter(
      (s) => s !== this.selectedStructure
    );
    this.fermerDialog();
  }
}
