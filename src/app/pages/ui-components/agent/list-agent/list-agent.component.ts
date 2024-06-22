import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { Structure } from 'src/app/models/Structure';
import { Role } from 'src/app/models/Role';
import { AgentService } from 'src/app/services/Agent/agent.service';
import { StructureService } from 'src/app/services/Structure/structure.service';
import { RoleService } from 'src/app/services/role/role.service';
import { ImageService } from 'src/app/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss'],
})
export class ListAgentComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
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
  agentImages: string[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private agentService: AgentService,
    private roleService: RoleService,
    private structureService: StructureService,
    private formBuilder: FormBuilder,
    private imageService: ImageService,
    private toastr: ToastrService
  ) {
    this.agentForm = this.fb.group({
      id: 0,
      matricule: ['', Validators.required],
      nom: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      prenom: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'
          ),
        ],
      ],
      tel: ['', [Validators.required, Validators.pattern('^0[567][0-9]{8}$')]],
      adresse: ['', Validators.required],
      dateDeNaissance: ['', Validators.required],
      dateDeRecrutement: ['', Validators.required],
      structure: this.formBuilder.group({
        idStructure: ['', Validators.required],
      }),
      idRole: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      photo: [''],
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
      this.agents.forEach((agent) => {
        this.fetchAgentsImage(agent); // Pass the entire article object
      });
    });
  }

  loadStructures(): void {
    this.structureService
      .obtenirToutesStructures()
      .subscribe((data: Structure[]) => {
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
      width: '1000px',
     // height: '90vh',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(agent: Utilisateur): void {
    this.isEdit = true;
    this.selectedAgent = agent;
    this.agentForm.patchValue({
      id: agent.id,
      matricule: agent.matricule,
      nom: agent.nom,
      prenom: agent.prenom,
      username: agent.username,
      email: agent.email,
      tel: agent.tel,
      adresse: agent.adresse,
      dateDeNaissance: agent.dateDeNaissance,
      dateDeRecrutement: agent.dateDeRecrutement,
      structure: {
        idStructure: agent.structure.idStructure,
      },
      idRole: {
        id: agent.idRole.id,
      },
    });
    this.fetchAgentImage(agent);
    this.dialog.open(this.dialogAjoutModification, {
      width: '1000px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }
  }

  sauvegarderAgent(fileInput: any): void {
    const file: File = fileInput.files[0];
    if (this.agentForm.invalid) {
      this.toastr.warning(
        'Veuillez corriger les erreurs du formulaire avant de soumettre.',
        'Validation échouée'
      );
      return;
    }
    if (this.isEdit) {
      console.log(file, this.agentForm.value);
      this.agentService.updateUtilisateur(this.agentForm.value, file).subscribe(
        () => {
          this.loadAgents();
          this.fermerDialog();
          this.agentForm.reset();
          this.toastr.success('Agent modifié avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    } else {
      this.agentService.saveUtilisateur(this.agentForm.value, file).subscribe(
        () => {
          this.loadAgents();
          this.fermerDialog();
          this.agentForm.reset();
          this.toastr.success('Agent ajouté avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(agent: Utilisateur): void {
    this.selectedAgent = agent;
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
    this.agentService.deleteUtilisateur(this.selectedAgent.id).subscribe(
      () => {
        this.agents = this.agents.filter((a) => a !== this.selectedAgent);
        this.fermerDialog();
        this.toastr.success('Agent supprimé avec succès.', 'Succès');
      },
      (error) => {
        this.handleHttpError(error);
      }
    );
  }
  private handleHttpError(error: any): void {
    if (error.status === 409) {
      this.toastr.warning(
        'Un agent avec les mêmes attributs existe déjà.',
        'Erreur de conflit'
      );
    } else if (error.status === 500) {
      this.toastr.error(
        "Erreur lors de l'enregistrement de l'agent.",
        'Erreur interne du serveur'
      );
    } else {
      this.toastr.error("Une erreur inattendue s'est produite.", 'Erreur');
    }
  }
  getStructureName(structureId: number): string {
    const structure = this.structures.find(
      (s) => s.idStructure === structureId
    );
    return structure ? structure.nomStructure : '';
  }
  fetchAgentsImage(agent: Utilisateur): void {
    this.imageService.fetchImage(agent.photo).subscribe(
      (imageUrl) => {
        this.agentImages[agent.id] = imageUrl;
      },
      (error) => {
        console.error('Error fetching article image:', error);
      }
    );
  }
  fetchAgentImage(agent: Utilisateur): void {
    this.imageService.fetchImage(agent.photo).subscribe(
      (imageUrl) => {
        this.imgURL = imageUrl; // Set the image URL for preview
      },
      (error) => {
        console.error('Error fetching article image:', error);
      }
    );
  }
}
