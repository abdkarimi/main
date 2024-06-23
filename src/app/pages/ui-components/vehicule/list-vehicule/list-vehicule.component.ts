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
import { ImageService } from 'src/app/services/image/image.service';

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
  imgURL: any;
  vehiculeImages: string[] = [];

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
    private fb: FormBuilder,
    private imageService: ImageService,
  ) {
    this.vehiculeForm = this.fb.group({
      idVehicule: 0,
      photoVehicule: [''],
      matriculeVehicule: ['', Validators.required],
      dateCirculation: ['', Validators.required],
      puissanceFiscale: ['', Validators.required],
      nbPlace: ['', Validators.required],
      couleurVehicule: ['', Validators.required],
      kilometrageVehicule: ['', Validators.required],
      modele: this.fb.group({
        idModele: ['', Validators.required],
      }),
      typeCarburant: this.fb.group({
        idTypeCarburant: ['', Validators.required],
      }),
      typeVehicule: this.fb.group({
        idTypeVehicule: ['', Validators.required],
      }),
      enumeration: this.fb.group({
        idEnumeration: ['', Validators.required],
      }),
      statut: this.fb.group({
        idStatut: ['', Validators.required],
      }),
      concessionnaire: this.fb.group({
        idConcessionnaire: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.vehiculeService.getAllVehicules().subscribe((data) => {
      this.vehicules = data;
      this.vehicules.forEach((vehicule) => {
        this.fetchVehiculesImage(vehicule);
      });
    });
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
      width: '1000px',
      autoFocus: false,
    });
  }

  ouvrirDialogModification(vehicule: Vehicule): void {
    this.isEdit = true;
    this.selectedVehicule = vehicule;
    this.vehiculeForm.patchValue({
      idVehicule: vehicule.idVehicule,
      matriculeVehicule: vehicule.matriculeVehicule,
      dateCirculation: vehicule.dateCirculation,
      puissanceFiscale: vehicule.puissanceFiscale,
      nbPlace: vehicule.nbPlace,
      couleurVehicule: vehicule.couleurVehicule,
      kilometrageVehicule: vehicule.kilometrageVehicule,
      modele: {
        idModele: vehicule.modele.idModele,
      },
      typeCarburant: {
        idTypeCarburant: vehicule.typeCarburant.idTypeCarburant,
      },
      typeVehicule: {
        idTypeVehicule: vehicule.typeVehicule.idTypeVehicule,
      },
      enumeration: {
        idEnumeration: vehicule.enumeration.idEnumeration,
      },
      statut: {
        idStatut: vehicule.statut.idStatut,
      },
      concessionnaire: {
        idConcessionnaire: vehicule.concessionnaire.idConcessionnaire,
      },
    });
    this.fetchVehiculeImage(vehicule);
    this.dialog.open(this.dialogAjoutModification, {
      width: '1000px',
      autoFocus: false,
    });
  }

  ouvrirDialogConsultation(vehicule: Vehicule): void {
    this.fetchVehiculeImage(vehicule)
    this.selectedVehicule = vehicule;
    this.dialog.open(this.dialogConsultation, {
      width: '1000px',
      autoFocus: false,
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

  sauvegarderVehicule(fileInput: any): void {
    const file: File = fileInput.files[0];
    if (this.vehiculeForm.invalid) {
      this.toastr.warning('Veuillez corriger les erreurs du formulaire avant de soumettre.', 'Validation échouée');
      return;
    }
    if (this.isEdit) {
      this.vehiculeService.updateVehicule(this.selectedVehicule.idVehicule, this.vehiculeForm.value, file).subscribe(
        () => {
          this.loadData();
          this.fermerDialog();
          this.vehiculeForm.reset();
          this.toastr.success('Véhicule modifié avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    } else {
      this.vehiculeService.saveVehicule(this.vehiculeForm.value, file).subscribe(
        () => {
          this.loadData();
          this.fermerDialog();
          this.vehiculeForm.reset();
          this.toastr.success('Véhicule ajouté avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
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
        this.vehicules = this.vehicules.filter((v) => v !== this.selectedVehicule);
        this.fermerDialog();
        this.toastr.success('Véhicule supprimé avec succès.', 'Succès');
      },
      (error) => {
        this.handleHttpError(error);
      }
    );
  }

  private handleHttpError(error: any): void {
    if (error.status === 409) {
      this.toastr.warning('Un véhicule avec les mêmes attributs existe déjà.', 'Erreur de conflit');
    } else if (error.status === 500) {
      this.toastr.error("Erreur lors de l'enregistrement du véhicule.", 'Erreur interne du serveur');
    } else {
      this.toastr.error("Une erreur inattendue s'est produite.", 'Erreur');
    }
  }

  fetchVehiculeImage(vehicule: Vehicule): void {
    this.imageService.fetchImage(vehicule.photoVehicule).subscribe(
      (imgURL) => {
        this.imgURL = imgURL; // Set the image URL for preview
      },
      (error) => {
        console.error('Error fetching Vehicule image:', error);
      }
    );
  }

  fetchVehiculesImage(vehicule: Vehicule): void {
    this.imageService.fetchImage(vehicule.photoVehicule).subscribe(
      (imageUrl) => {
        this.vehiculeImages[vehicule.idVehicule] = imageUrl;
      },
      (error) => {
        console.error('Error fetching Vehicule image:', error);
      }
    );
  }
}
