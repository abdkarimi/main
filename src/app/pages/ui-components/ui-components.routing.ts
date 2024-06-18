import { Routes } from '@angular/router';

// ui
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
import { AuthorizationGuard } from 'src/app/guards/authorization.guard';
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
import { ListAgentComponent } from './agent/list-agent/list-agent.component';
import { ListEnumerationComponent } from './enumeration/list-enumeration/list-enumeration.component';
import { ListDestinationComponent } from './destination/list-destination/list-destination.component';
import { ListAssuranceComponent } from './assurance/list-assurance/list-assurance.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { ListPerimetreComponent } from './perimetre/list-perimetre/list-perimetre.component';
import { ListVehiculeComponent } from './vehicule/list-vehicule/list-vehicule.component';
import { ListAccidentComponent } from './accident/list-accident/list-accident.component';
import { ListAlerteComponent } from './alerte/list-alerte/list-alerte.component';
import { ListInterventionComponent } from './intervention/list-intervention/list-intervention.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'SaisirA',
        component: AsaisirComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin', 'Agent'] },
      },
      {
        path: 'ModifierA',
        component: AmodifierComponent,
      },
      {
        path: 'SupprimerA',
        component: AsupprimerComponent,
      },
      {
        path: 'AjouterC',
        component: CajouterComponent,
      },
      {
        path: 'ModifierC',
        component: CmodifierComponent,
      },
      {
        path: 'SupprimerC',
        component: CsupprimerComponent,
      },

      {
        path: 'SuivreD',
        component: DsuivreComponent,
      },
      {
        path: 'AnnulerD',
        component: DannulerComponent,
      },
      {
        path: 'SuivreFD',
        component: DsuivreFComponent,
      },
      {
        path: 'ES',
        component: EetatstockComponent,
      },
      {
        path: 'ajouterU',
        component: UajouterComponent,
      },
      {
        path: 'modifierU',
        component: UmodifierComponent,
      },
      {
        path: 'supprimerU',
        component: UsupprimerComponent,
      },
      {
        path: 'AjouterCompagnie',
        component: AjouterCompagnieComponent,
      },
      {
        path: 'ModifierCompagnie',
        component: ModifierCompagnieComponent,
      },
      {
        path: 'SupprimerCompagnie',
        component: SupprimerCompagnieComponent,
      },
      {
        path: 'ListConcessionnaire',
        component: ListConcessionnaireComponent,
      },
      {
        path: 'ListCompagnie',
        component: ListCompagnieComponent,
      },
      {
        path: 'ListGarage',
        component: ListGarageComponent,
      },
      {
        path: 'ListMarque',
        component: ListMarqueComponent,
      },
      {
        path: 'ListModele',
        component: ListModeleComponent,
      },
      {
        path: 'ListStatut',
        component: ListStatutComponent,
      },
      {
        path: 'ListTCarburant',
        component: ListTCarburantComponent,
      },
      {
        path: 'ListCatVehicule',
        component: ListCatVehiculeComponent,
      },
      {
        path: 'ListTIntervention',
        component: ListTInterventionComponent,
      },
      {
        path: 'ListStructure',
        component: ListStructureComponent,
      },
      {
        path: 'ListAgent',
        component: ListAgentComponent,
      },
      {
        path: 'ListEnumeration',
        component: ListEnumerationComponent,
      },
      {
        path: 'ListDestination',
        component: ListDestinationComponent,
      },
      {
        path: 'ListAssurance',
        component: ListAssuranceComponent,
      },
      {
        path: 'ListRole',
        component: ListRoleComponent,
      },
      {
        path: 'ListPerimetre',
        component: ListPerimetreComponent,
      },
      {
        path: 'ListVehicule',
        component: ListVehiculeComponent,
      },
      {
        path: 'ListAccident',
        component: ListAccidentComponent,
      },
      {
        path: 'ListAlerte',
        component: ListAlerteComponent,
      },
      {
        path: 'ListIntervention',
        component: ListInterventionComponent,
      },
    ],
  },
];
