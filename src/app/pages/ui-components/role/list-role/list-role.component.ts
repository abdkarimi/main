import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
})
export class ListRoleComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'nom', 'description', 'actions'];
  roles: MatTableDataSource<Role> = new MatTableDataSource();
  selectedRole: Role;
  isEdit: boolean = false;
  roleForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private roleService: RoleService,
    private toastr: ToastrService
  ) {
    this.roleForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadRoles();
    this.roles.paginator = this.paginator;
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe((data: Role[]) => {
      this.roles.data = data;
      this.roles.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roles.filter = filterValue.trim().toLowerCase();

    if (this.roles.paginator) {
      this.roles.paginator.firstPage();
    }
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.roleForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  ouvrirDialogModification(role: Role): void {
    this.isEdit = true;
    this.selectedRole = role;
    this.roleForm.patchValue(role);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  sauvegarderRole(): void {
    if (this.roleForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire', 'Erreur');
      return;
    }

    const role = this.roleForm.value;

    if (this.isEdit) {
      this.roleService.updateRole(this.selectedRole.id, role).subscribe(() => {
        this.toastr.success('Rôle mis à jour avec succès', 'Succès');
        this.loadRoles();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error('Erreur lors de la mise à jour du rôle', 'Erreur');
      });
    } else {
      this.roleService.createRole(role).subscribe(() => {
        this.toastr.success('Rôle ajouté avec succès', 'Succès');
        this.loadRoles();
        this.dialog.closeAll();
      }, () => {
        this.toastr.error("Erreur lors de l'ajout du rôle", 'Erreur');
      });
    }
  }

  ouvrirDialogSuppression(role: Role): void {
    this.selectedRole = role;
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
    this.roleService.deleteRole(this.selectedRole.id).subscribe(() => {
      this.toastr.success('Rôle supprimé avec succès', 'Succès');
      this.loadRoles();
      this.fermerDialog();
    }, () => {
      this.toastr.error('Erreur lors de la suppression du rôle', 'Erreur');
    });
  }
}
