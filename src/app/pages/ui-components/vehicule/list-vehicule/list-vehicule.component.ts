import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Vehicule } from 'src/app/models/Vehicule';
import { Modele } from 'src/app/models/Modele';
import { TCarburant } from 'src/app/models/TCarburant';
import { CatVehicule } from 'src/app/models/CatVehicule';
import { Enumeration } from 'src/app/models/Enumeration';
import { Statut } from 'src/app/models/Statut';
import { Concessionnaire } from 'src/app/models/Concessionnaire';

import { ModeleService } from 'src/app/services/Modele/modele.service';
import { VehiculeService } from 'src/app/services/Vehicule/vehicule.service';
import { TcarburantService } from 'src/app/services/TCarburant/tcarburant.service';
import { CatvehiculeService } from 'src/app/services/CatVehicule/catvehicule.service';
import { EnumerationService } from 'src/app/services/enumeration/enumeration.service';
import { StatutService } from 'src/app/services/statut/statut.service';
import { ConcessionnaireService } from 'src/app/services/Concessionnaire/concessionnaire.service';

@Component({
  selector: 'app-list-vehicule',
  templateUrl: './list-vehicule.component.html',
  styleUrls: ['./list-vehicule.component.scss'],
})
export class ListVehiculeComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;
  @ViewChild('dialogConsultation') dialogConsultation: TemplateRef<any>;

  displayedColumns: string[] = [
    'photo',
    'matricule',
    'dateMiseCirculation',
    'puissanceFiscale',
    'nbrePlace',
    'couleur',
    'kilometrage',
    'modele',
    'carburant',
    'categorie',
    'enumeration',
    'statut',
    'concessionnaire',
    'actions',
  ];

  vehicules: Vehicule[] = [];
  modeles: Modele[] = [];
  carburants: TCarburant[] = [];
  categories: CatVehicule[] = [];
  enumerations: Enumeration[] = [];
  statuts: Statut[] = [];
  concessionnaires: Concessionnaire[] = [];

  selectedVehicule: Vehicule;
  isEdit: boolean = false;
  vehiculeForm: FormGroup;

  constructor(
    private vehiculeService: VehiculeService,
    private modeleService: ModeleService,
    private tcarburantService: TcarburantService,
    private catvehiculeService: CatvehiculeService,
    private enumerationService: EnumerationService,
    private statutService: StatutService,
    private concessionnaireService: ConcessionnaireService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.vehiculeForm = this.fb.group({
      photo: [''],
      matricule: ['', Validators.required],
      dateMiseCirculation: ['', Validators.required],
      puissanceFiscale: ['', Validators.required],
      nbrePlace: ['', Validators.required],
      couleur: ['', Validators.required],
      kilometrage: ['', Validators.required],
      modele: ['', Validators.required],
      carburant: ['', Validators.required],
      categorie: ['', Validators.required],
      enumeration: ['', Validators.required],
      statut: ['', Validators.required],
      concessionnaire: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.vehiculeService.getAllVehicules().subscribe((data) => (this.vehicules = data));
    this.modeleService.getAllModeles().subscribe((data) => (this.modeles = data));
    this.tcarburantService.getAllTypeCarburants().subscribe((data) => (this.carburants = data));
    this.catvehiculeService.getAllTypeVehicules().subscribe((data) => (this.categories = data));
    this.enumerationService.getAllEnumerations().subscribe((data) => (this.enumerations = data));
    this.statutService.getAllStatuts().subscribe((data) => (this.statuts = data));
    this.concessionnaireService.getAllConcessionnaires().subscribe((data) => (this.concessionnaires = data));
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.vehiculeForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
    });
  }

  ouvrirDialogModification(vehicule: Vehicule): void {
    this.isEdit = true;
    this.selectedVehicule = vehicule;
    this.vehiculeForm.patchValue(vehicule);
    this.dialog.open(this.dialogAjoutModification, {
      width: '800px',
      autoFocus: false,
    });
  }

  ouvrirDialogConsultation(vehicule: Vehicule): void {
    this.selectedVehicule = vehicule;
    this.dialog.open(this.dialogConsultation, {
      width: '800px',
      autoFocus: false,
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.vehiculeForm.patchValue({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  sauvegarderVehicule(): void {
    if (this.isEdit) {
      this.vehiculeService.updateVehicule(this.selectedVehicule.idVehicule, this.vehiculeForm.value, this.getFile() || undefined).subscribe(
        () => {
          this.toastr.success('Véhicule mis à jour avec succès');
          this.loadData();
          this.dialog.closeAll();
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour du véhicule');
          console.error(error);
        }
      );
    } else {
      const file = this.getFile();
      if (file) {
        this.vehiculeService.saveVehicule(this.vehiculeForm.value, file).subscribe(
          () => {
            this.toastr.success('Véhicule ajouté avec succès');
            this.loadData();
            this.dialog.closeAll();
          },
          (error) => {
            this.toastr.error('Erreur lors de l\'ajout du véhicule');
            console.error(error);
          }
        );
      } else {
        this.toastr.error('Le fichier de photo est requis');
      }
    }
  }

  ouvrirDialogSuppression(vehicule: Vehicule): void {
    this.selectedVehicule = vehicule;
    this.dialog.open(this.dialogSuppression, {
      width: '400px',
      autoFocus: false,
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
  }

  confirmerSuppression(): void {
    this.vehiculeService.deleteVehicule(this.selectedVehicule.idVehicule).subscribe(
      () => {
        this.toastr.success('Véhicule supprimé avec succès');
        this.loadData();
        this.fermerDialog();
      },
      (error) => {
        this.toastr.error('Erreur lors de la suppression du véhicule');
        console.error(error);
      }
    );
  }

  getModeleName(id: number): string {
    const modele = this.modeles.find((m) => m.idModele === id);
    return modele ? modele.libelleModele : '';
  }

  getCarburantName(id: number): string {
    const carburant = this.carburants.find((c) => c.idTypeCarburant === id);
    return carburant ? carburant.libelleTypeCarburant : '';
  }

  getCategorieName(id: number): string {
    const categorie = this.categories.find((c) => c.idTypeVehicule === id);
    return categorie ? categorie.libelleTypeVehicule : '';
  }

  getEnumerationName(id: number): string {
    const enumeration = this.enumerations.find((e) => e.idEnumeration === id);
    return enumeration ? enumeration.designationEnumeration : '';
  }

  getStatutName(id: number): string {
    const statut = this.statuts.find((s) => s.idStatut === id);
    return statut ? statut.designationStatut : '';
  }

  getConcessionnaireName(id: number): string {
    const concessionnaire = this.concessionnaires.find((c) => c.idConcessionnaire === id);
    return concessionnaire ? concessionnaire.nomConcessionnaire : '';
  }

  private getFile(): File | null {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    return fileInput && fileInput.files ? fileInput.files[0] : null;
  }
}
