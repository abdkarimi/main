import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { MatNativeDateModule } from '@angular/material/core';
import { AsaisirComponent } from './asaisir/asaisir.component';
import { AmodifierComponent } from './amodifier/amodifier.component';
import { AsupprimerComponent } from './asupprimer/asupprimer.component';
import { CajouterComponent } from './cajouter/cajouter.component';
import { CmodifierComponent } from './cmodifier/cmodifier.component';
import { CsupprimerComponent } from './csupprimer/csupprimer.component';
import { DsuivreComponent } from './dsuivre/dsuivre.component';
import { DannulerComponent } from './dannuler/dannuler.component';

import { DsuivreFComponent } from './dsuivre-f/dsuivre-f.component';
import { EetatstockComponent } from './eetatstock/eetatstock.component';

import { UajouterComponent } from './uajouter/uajouter.component';
import { UmodifierComponent } from './umodifier/umodifier.component';
import { UsupprimerComponent } from './usupprimer/usupprimer.component';
import { AjouterCompagnieComponent } from './compagnie/ajouter-compagnie/ajouter-compagnie.component';
import { ModifierCompagnieComponent } from './compagnie/modifier-compagnie/modifier-compagnie.component';
import { SupprimerCompagnieComponent } from './compagnie/supprimer-compagnie/supprimer-compagnie.component';
import { ListConcessionnaireComponent } from './concessionnaire/list-concessionnaire/list-concessionnaire.component';
import { ListCompagnieComponent } from './compagnie/list-compagnie/list-compagnie.component';
import { ListGarageComponent } from './garage/list-garage/list-garage.component';
import { ListMarqueComponent } from './marque/list-marque/list-marque.component';
import { ListModeleComponent } from './modele/list-modele/list-modele.component';
import { ListStatutComponent } from './statut/list-statut/list-statut.component';
import { ListTCarburantComponent } from './typecarburant/list-tcarburant/list-tcarburant.component';
import { ListCatVehiculeComponent } from './catvehicule/list-cat-vehicule/list-cat-vehicule.component';
import { ListTInterventionComponent } from './typeintervention/list-tintervention/list-tintervention.component';
import { ListStructureComponent } from './structure/list-structure/list-structure.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { ListAgentComponent } from './agent/list-agent/list-agent.component';
import { ListEnumerationComponent } from './enumeration/list-enumeration/list-enumeration.component';
import { ListDestinationComponent } from './destination/list-destination/list-destination.component';
import { ListAssuranceComponent } from './assurance/list-assurance/list-assurance.component';
import { ListPerimetreComponent } from './perimetre/list-perimetre/list-perimetre.component';
import { ListVehiculeComponent } from './vehicule/list-vehicule/list-vehicule.component';
import { ListAccidentComponent } from './accident/list-accident/list-accident.component';
import { ListAlerteComponent } from './alerte/list-alerte/list-alerte.component';
import { ListInterventionComponent } from './intervention/list-intervention/list-intervention.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
  ],
  declarations: [
    AsaisirComponent,
    AmodifierComponent,
    AsupprimerComponent,
    CajouterComponent,
    CmodifierComponent,
    CsupprimerComponent,
    DsuivreComponent,
    DannulerComponent,
    DsuivreFComponent,
    EetatstockComponent,
    UajouterComponent,
    UmodifierComponent,
    UsupprimerComponent,
    AjouterCompagnieComponent,
    ModifierCompagnieComponent,
    SupprimerCompagnieComponent,
    ListConcessionnaireComponent,
    ListCompagnieComponent,
    ListGarageComponent,
    ListMarqueComponent,
    ListModeleComponent,
    ListStatutComponent,
    ListTCarburantComponent,
    ListCatVehiculeComponent,
    ListTInterventionComponent,
    ListStructureComponent,
    ListRoleComponent,
    ListAgentComponent,
    ListEnumerationComponent,
    ListDestinationComponent,
    ListAssuranceComponent,
    ListPerimetreComponent,
    ListVehiculeComponent,
    ListAccidentComponent,
    ListAlerteComponent,
    ListInterventionComponent,

  ],
})
export class UicomponentsModule {}
