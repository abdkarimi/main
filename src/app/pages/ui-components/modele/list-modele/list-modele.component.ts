import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Modele } from 'src/app/models/Modele';
import { Marque } from 'src/app/models/Marque';
import { ModeleService } from 'src/app/services/Modele/modele.service';
import { MarqueService } from 'src/app/services/marque/marque.service';

@Component({
  selector: 'app-list-modele',
  templateUrl: './list-modele.component.html',
  styleUrls: ['./list-modele.component.scss']
})
export class ListModeleComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['modele', 'marque', 'actions'];
  modeles: Modele[] = [];
  marques: Marque[] = [];
  selectedModele: Modele | null = null; // Permettre à selectedModele d'accepter null
  isEdit: boolean = false;
  modeleForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private modeleService: ModeleService,
    private marqueService: MarqueService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.modeleForm = this.fb.group({
      idModele: 0,
      libelleModele: ['', Validators.required],
      marque: this.formBuilder.group({
        idMarque: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.loadModeles();
    this.loadMarques();
  }

  loadModeles(): void {
    this.modeleService.getAllModeles().subscribe(
      data => {
        this.modeles = data;
      },
      error => {
        this.toastr.error('Erreur lors du chargement des modèles', 'Erreur');
      }
    );
  }

  loadMarques(): void {
    this.marqueService.getAllMarques().subscribe(
      data => {
        this.marques = data;
      },
      error => {
        this.toastr.error('Erreur lors du chargement des marques', 'Erreur');
      }
    );
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.modeleForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });
  }

  ouvrirDialogModification(modele: Modele): void {
    this.isEdit = true;
    this.selectedModele = modele;
    this.modeleForm.patchValue({
      idModele: modele.idModele,
      libelleModele: modele.libelleModele,
      marque: modele.marque.idMarque
    });
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });
  }

  sauvegarderModele(): void {
    if (this.modeleForm.invalid) {
      this.toastr.warning('Veuillez remplir tous les champs requis', 'Formulaire incomplet');
      return;
    }

    const modele: Modele = {
      ...this.modeleForm.value,
    };

    if (this.isEdit) {
      this.modeleService.updateModele(modele.idModele, modele).subscribe(
        () => {
          this.loadModeles();
          this.toastr.success('Modèle mis à jour avec succès', 'Succès');
          this.fermerDialog();
        },
        error => {
          this.toastr.error('Erreur lors de la mise à jour du modèle', 'Erreur');
        }
      );
    } else {
      this.modeleService.createModele(modele).subscribe(
        () => {
          this.loadModeles();
          this.toastr.success('Modèle créé avec succès', 'Succès');
          this.fermerDialog();
        },
        error => {
          this.toastr.error('Erreur lors de la création du modèle', 'Erreur');
        }
      );
    }
  }

  ouvrirDialogSuppression(modele: Modele): void {
    this.selectedModele = modele;
    this.dialog.open(this.dialogSuppression, {
      width: '400px',
      autoFocus: false,
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
    this.selectedModele = null; // Utiliser null pour indiquer aucune sélection
  }

  confirmerSuppression(): void {
    if (this.selectedModele) {
      this.modeleService.deleteModele(this.selectedModele.idModele).subscribe(
        () => {
          this.loadModeles();
          this.toastr.success('Modèle supprimé avec succès', 'Succès');
          this.fermerDialog();
        },
        error => {
          this.toastr.error('Erreur lors de la suppression du modèle', 'Erreur');
        }
      );
    }
  }
}
