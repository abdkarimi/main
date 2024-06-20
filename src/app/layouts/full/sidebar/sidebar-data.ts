import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'Tableau de bord',
    iconName: 'layout-dashboard',
    iconColor: 'icon-color-primary',
    route: '/dashboard',
    roles: ['Admin', 'Agent'],
  },
  {
    displayName: 'Order de mission',
    iconName: 'file-time',
    //iconColor: '#00abfb',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Créer',
        iconName: 'folder-plus',
        iconColor: '#47a030',
        route: '/ui-components/SaisirA',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Modifier',
        iconName: 'file-pencil',
        iconColor: '#47a030',
        route: '/ui-components/ModifierA',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Supprimer',
        iconName: 'file-x',
        iconColor: '#47a030',
        route: '/ui-components/SupprimerA',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Lister',
        iconName: 'file-stack',
        iconColor: '#47a030',
        route: '/ui-components/SupprimerA',
        roles: ['Admin', 'Agent'],
      },
    ],
  },

  //--------------------------------Déclarations-------------------
  {
    displayName: 'Déclarations',
    iconName: 'text-plus',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Accident',
        iconName: 'car-crash',
        iconColor: '#ed1c24',
        route: '/ui-components/ListAccident',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Alerte',
        iconName: 'alarm',
        iconColor: '#ed1c24',
        route: '/ui-components/ListAlerte',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Intervention',
        iconName: 'car-crane',
        iconColor: '#ed1c24',
        route: '/ui-components/ListIntervention',
        roles: ['Admin', 'Agent'],
      },
    ],
  },
  //------------------------------Fin Déclaration------------------
  //--------------------------------Gestion------------------------
  {
    displayName: 'Gestion',
    iconName: 'adjustments',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Agent',
        iconName: 'user-circle',
        iconColor: '#47a030',
        route: '/ui-components/ListAgent',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Assurance',
        iconName: 'circle-letter-a',
        iconColor: '#47a030',
        route: '/ui-components/ListAssurance',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Compagnie',
        iconName: 'circle-letter-c',
        iconColor: '#47a030',
        route: '/ui-components/ListCompagnie',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Concessionnaire',
        iconName: 'report-medical',
        iconColor: '#47a030',
        route: '/ui-components/ListConcessionnaire',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Garage',
        iconName: 'file-plus',
        iconColor: '#47a030',
        route: '/ui-components/ListGarage',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Marque',
        iconName: 'category',
        iconColor: '#47a030',
        route: '/ui-components/ListMarque',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Modèle',
        iconName: 'circle-letter-m',
        iconColor: '#47a030',
        route: '/ui-components/ListModele',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Véhicule',
        iconName: 'car',
        iconColor: '#47a030',
        route: '/ui-components/ListVehicule',
        roles: ['Admin', 'Agent'],
      },
    ],
  },

  //-------------------------------Fin Gestion-----------
  //------------------------------Paramètres------------
  {
    displayName: 'Paramètres',
    iconName: 'settings',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Destination',
        iconName: 'map-pin',
        iconColor: '#47a030',
        route: '/ui-components/ListDestination',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Enumération',
        iconName: 'box-multiple-0',
        iconColor: '#47a030',
        route: '/ui-components/ListEnumeration',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Périmètre',
        iconName: 'map-pins',
        iconColor: '#47a030',
        route: '/ui-components/ListPerimetre',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Rôle',
        iconName: 'users-group',
        iconColor: '#47a030',
        route: '/ui-components/ListRole',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Statut',
        iconName: 'file-unknown',
        iconColor: '#47a030',
        route: '/ui-components/ListStatut',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Structure',
        iconName: 'building',
        iconColor: '#47a030',
        route: '/ui-components/ListStructure',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Type Carburant',
        iconName: 'charging-pile',
        iconColor: '#47a030',
        route: '/ui-components/ListTCarburant',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Type Véhicule',
        iconName: 'stack-2',
        iconColor: '#47a030',
        route: '/ui-components/ListCatVehicule',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Type Intervention',
        iconName: 'tool',
        iconColor: '#47a030',
        route: '/ui-components/ListTIntervention',
        roles: ['Admin', 'Agent'],
      },
    ],
  },
  //------------------------------Fin Paramètres--------------------
  //-----------------------------Editions-------------------------------

  {
    displayName: 'Editions',
    iconName: 'device-desktop-analytics',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Etat du carburant',
        iconName: 'device-imac-dollar',
        iconColor: '#47a030',
        route: '/ui-components/SupprimerC',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Etat des Interventions',
        iconName: 'device-imac-check',
        iconColor: '#47a030',
        route: '/ui-components/ModifierC',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Etat des Missions',
        iconName: 'device-imac-down',
        iconColor: '#47a030',
        route: '/ui-components/SupprimerC',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Etat du Parc Auto',
        iconName: 'device-heart-monitor',
        iconColor: '#47a030',
        route: '/ui-components/AjouterC',
        roles: ['Admin', 'Agent'],
      },
    ],
  },
  //-----------------------------Fin Editions-------------------------------
  //------------------------------Rapports & Statistiques------------

  {
    displayName: 'Statistiques & Rapports',
    iconName: 'chart-histogram',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Ajouter',
        iconName: 'file-search',
        route: '/ui-components/AjouterC',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Modifier',
        iconName: 'report-medical',
        route: '/ui-components/ModifierC',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Supprimer',
        iconName: 'file-plus',
        route: '/ui-components/SupprimerC',
        roles: ['Admin', 'Agent'],
      },
    ],
  },
  //------------------------------Fin Rapports & Statistiques------------
];
