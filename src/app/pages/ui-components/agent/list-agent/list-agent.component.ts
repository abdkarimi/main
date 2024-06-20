import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { Structure } from 'src/app/models/Structure';
import { Role } from 'src/app/models/Role';
import { AgentService } from 'src/app/services/Agent/agent.service';
import { StructureService } from 'src/app/services/Structure/structure.service';
import { RoleService } from 'src/app/services/role/role.service';

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
    'dateDeNaissance',
    'dateDeRecrutement',
    'structure',
    'role',
    'actions',
  ];

  agents: Utilisateur[] = [];
  structures: Structure[] = [];
  roles: Role[] = [];

  selectedAgent: Utilisateur;
  isEdit: boolean = false;
  agentForm: FormGroup;
  imgURL: any;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private agentService: AgentService,
    private roleService: RoleService,
    private structureService: StructureService
  ) {
    this.agentForm = this.fb.group({
      matricule: [''],
      nom: [''],
      prenom: [''],
      username: [''],
      email: [''],
      password: [''],
      tel: [''],
      adresse: [''],
      dateDeNaissance: [''],
      dateDeRecrutement: [''],
      structure: [''],
      idRole: [''],
      photo: ['']
    });
  }

  ngOnInit(): void {
    this.loadAgents();
    this.loadStructures();
    this.loadRoles();
  }

  loadAgents(): void {
    this.agentService.getAllUtilisateurs().subscribe((data: Utilisateur[]) => {
      this.agents = data;
    });
  }

  loadStructures(): void {
    this.structureService.obtenirToutesStructures().subscribe((data: Structure[]) => {
      this.structures = data;
    });
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe((data: Role[]) => {
      this.roles = data;
    });
  }

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

  ouvrirDialogModification(agent: Utilisateur): void {
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
        this.imgURL = reader.result;
        this.agentForm.patchValue({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  sauvegarderAgent(fileInput: any): void {
    const file: File = fileInput.files[0];

    if (this.isEdit) {
      this.agentService.updateUtilisateur(this.agentForm.value, file).subscribe(() => {
        this.loadAgents();
      });
    } else {
      this.agentService.saveUtilisateur(this.agentForm.value, file).subscribe(() => {
        this.loadAgents();
      });
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(agent: Utilisateur): void {
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
    this.agentService.deleteUtilisateur(this.selectedAgent.id).subscribe(() => {
      this.agents = this.agents.filter(a => a !== this.selectedAgent);
      this.fermerDialog();
    });
  }

  getStructureName(structureId: number): string {
    const structure = this.structures.find(s => s.idStructure === structureId);
    return structure ? structure.nomStructure : '';
  }
}
