import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Assurance } from 'src/app/models/Assurance';
import { Compagnie } from 'src/app/models/Compagnie';
import { Vehicule } from 'src/app/models/Vehicule';
import { AssuranceService } from 'src/app/services/Assurance/assurance.service';
import { VehiculeService } from 'src/app/services/Vehicule/vehicule.service';
import { CompagnieService } from 'src/app/services/compagnie/compagnie.service';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-list-assurance',
  templateUrl: './list-assurance.component.html',
  styleUrls: ['./list-assurance.component.scss'],
})
export class ListAssuranceComponent implements OnInit {
  @ViewChild('dialogAjoutModification') dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = [
    'id',
    'police',
    'compagnie',
    'vehicule',
    'dateDebutGarantie',
    'dateFinGarantie',
    'attestation',
    'actions',
  ];

  assurances: Assurance[] = [];
  compagnies: Compagnie[] = [];
  vehicules: Vehicule[] = [];

  selectedAssurance: Assurance;
  isEdit: boolean = false;
  assuranceForm: FormGroup;
  pdfURL: any;
  assurancePDF: { [key: number]: string } = {};

  constructor(
    private assuranceService: AssuranceService,
    private vehiculeService: VehiculeService,
    private compagnieService: CompagnieService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private imageService: ImageService,
  ) {
    this.assuranceForm = this.fb.group({
      idAssurance: 0,
      police: ['', Validators.required],
      debutGarantie: ['', Validators.required],
      finGarantie: ['', Validators.required],
      cheminPolice: [''],
      compagnie: this.fb.group({
        idCompagnie: ['', Validators.required],
      }),
      vehicule: this.fb.group({
        idVehicule: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.assuranceService.getAllAssurances().subscribe((data) => {
      this.assurances = data;
      this.assurances.forEach((assurance) => {
        this.fetchAssurancesImage(assurance);
      });
    });
    this.vehiculeService.getAllVehicules().subscribe((data) => (this.vehicules = data));
    this.compagnieService.getAllCompagnies().subscribe((data) => (this.compagnies = data));
  }

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.assuranceForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '1000px',
      autoFocus: false,
    });
  }

  ouvrirDialogModification(assurance: Assurance): void {
    this.isEdit = true;
    this.selectedAssurance = assurance;
    this.assuranceForm.patchValue({
      idAssurance: assurance.idAssurance,
      police: assurance.police,
      debutGarantie: assurance.debutGarantie,
      finGarantie: assurance.finGarantie,
      compagnie: {
        idCompagnie: assurance.compagnie.idCompagnie,
      },
      vehicule: {
        idVehicule: assurance.vehicule.idVehicule,
      },
    });
    this.fetchAssuranceImage(assurance);
    this.dialog.open(this.dialogAjoutModification, {
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
        this.pdfURL = reader.result;
      };
    }
  }

  sauvegarderAssurance(fileInput: any): void {
    const file: File = fileInput.files[0];
    if (this.assuranceForm.invalid) {
      this.toastr.warning('Veuillez corriger les erreurs du formulaire avant de soumettre.', 'Validation échouée');
      return;
    }
    if (this.isEdit) {
      this.assuranceService.updateAssurance(this.selectedAssurance.idAssurance, this.assuranceForm.value, file).subscribe(
        () => {
          this.loadData();
          this.fermerDialog();
          this.assuranceForm.reset();
          this.toastr.success('Assurance modifiée avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    } else {
      this.assuranceService.createAssurance(this.assuranceForm.value, file).subscribe(
        () => {
          this.loadData();
          this.fermerDialog();
          this.assuranceForm.reset();
          this.toastr.success('Assurance ajoutée avec succès.', 'Succès');
        },
        (error) => {
          this.handleHttpError(error);
        }
      );
    }
  }

  ouvrirDialogSuppression(assurance: Assurance): void {
    this.selectedAssurance = assurance;
    this.dialog.open(this.dialogSuppression, {
      width: '400px',
      autoFocus: false,
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
  }

  confirmerSuppression(): void {
    this.assuranceService.deleteAssurance(this.selectedAssurance.idAssurance).subscribe(
      () => {
        this.assurances = this.assurances.filter((a) => a !== this.selectedAssurance);
        this.fermerDialog();
        this.toastr.success('Assurance supprimée avec succès.', 'Succès');
      },
      (error) => {
        this.handleHttpError(error);
      }
    );
  }

  private handleHttpError(error: any): void {
    if (error.status === 409) {
      this.toastr.warning('Une assurance avec les mêmes attributs existe déjà.', 'Erreur de conflit');
    } else if (error.status === 500) {
      this.toastr.error("Erreur lors de l'enregistrement de l'assurance.", 'Erreur interne du serveur');
    } else {
      this.toastr.error("Une erreur inattendue s'est produite.", 'Erreur');
    }
  }

  getCompagnieName(id: number): string {
    const compagnie = this.compagnies.find((c) => c.idCompagnie === id);
    return compagnie ? compagnie.nomCompagnie : '';
  }

  getVehiculeName(id: number): string {
    const vehicule = this.vehicules.find((v) => v.idVehicule === id);
    return vehicule ? vehicule.matriculeVehicule : '';
  }

  fetchAssuranceImage(assurance: Assurance): void {
    this.imageService.fetchImage(assurance.cheminPolice).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        this.pdfURL = url;
      },
      (error) => {
        console.error('Error fetching assurance PDF:', error);
      }
    );
  }

  fetchAssurancesImage(assurance: Assurance): void {
    this.imageService.fetchImage(assurance.cheminPolice).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        this.assurancePDF[assurance.idAssurance] = url;
      },
      (error) => {
        console.error('Error fetching assurance PDF:', error);
      }
    );
  }
}
