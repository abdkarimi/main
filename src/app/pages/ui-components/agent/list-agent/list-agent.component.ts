import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Agent {
  matricule: number;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  dateRecrutement: Date;
  affectation: number;
  role: string;
  photo: string;
}

interface Structure {
  id: number;
  designation: string;
}

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss'],
})
export class ListAgentComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = [
    'photo',
    'matricule',
    'nom',
    'prenom',
    'dateNaissance',
    'dateRecrutement',
    'affectation',
    'role',
    'actions',
  ];
  agents: Agent[] = [
    {
      matricule: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      dateNaissance: new Date('1980-01-01'),
      dateRecrutement: new Date('2010-06-15'),
      affectation: 1,
      role: 'Agent',
      photo: 'https://via.placeholder.com/150'
    },
    {
      matricule: 2,
      nom: 'Martin',
      prenom: 'Marie',
      dateNaissance: new Date('1990-03-12'),
      dateRecrutement: new Date('2015-04-20'),
      affectation: 2,
      role: 'Admin',
      photo: 'https://via.placeholder.com/150'
    },
  ];

  structures: Structure[] = [
    { id: 1, designation: 'Structure 1' },
    { id: 2, designation: 'Structure 2' },
  ];

  roles: string[] = ['Agent', 'Admin', 'Chef du Parc', 'Chef de Département'];

  selectedAgent: Agent;
  isEdit: boolean = false;
  agentForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.agentForm = this.fb.group({
      matricule: [''],
      nom: [''],
      prenom: [''],
      dateNaissance: [''],
      dateRecrutement: [''],
      affectation: [''],
      role: [''],
      photo: ['']
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.agentForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(agent: Agent): void {
    this.isEdit = true;
    this.selectedAgent = agent;
    this.agentForm.patchValue(agent);
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.agentForm.patchValue({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  sauvegarderAgent(): void {
    if (this.isEdit) {
      Object.assign(this.selectedAgent, this.agentForm.value);
    } else {
      this.agents.push(this.agentForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(agent: Agent): void {
    this.selectedAgent = agent;
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
    this.agents = this.agents.filter(a => a !== this.selectedAgent);
    this.fermerDialog();
  }

  getStructureName(structureId: number): string {
    const structure = this.structures.find(s => s.id === structureId);
    return structure ? structure.designation : '';
  }
}
