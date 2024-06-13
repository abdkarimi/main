import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'Tableau de bord',
    iconName: 'layout-dashboard',
    route: '/dashboard',
    roles: ['Admin', 'Agent'],
  },
  {
    displayName: 'Order de mission',
    iconName: 'article',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Saisir',
        iconName: 'file-plus',
        route: '/ui-components/SaisirA',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Modifier',
        iconName: 'file-pencil',
        route: '/ui-components/ModifierA',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Supprimer',
        iconName: 'file-pencil',
        route: '/ui-components/SupprimerA',
        roles: ['Admin', 'Agent'],
      },
    ],
  },

  //--------------------------------Déclarations-------------------
  {
    displayName: 'Déclarations',
    iconName: 'article',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Accident',
        iconName: 'file-plus',
        route: '/ui-components/SupprimerC',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Alerte',
        iconName: 'file-search',
        route: '/ui-components/AjouterC',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Intervention',
        iconName: 'file-plus',
        route: '/ui-components/SupprimerC',
        roles: ['Admin', 'Agent'],
      },
    ],
  },
  //------------------------------Fin Déclaration------------------
  //--------------------------------Gestion------------------------
  {
    displayName: 'Gestion',
    iconName: 'article',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Agent',
        iconName: 'file-plus',
        route: '/ui-components/ListAgent',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Compagnie',
        iconName: 'file-search',
        //route: '/ui-components/AjouterCompagnie',
        route: '/ui-components/ListCompagnie',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Concessionnaire',
        iconName: 'report-medical',
        route: '/ui-components/ListConcessionnaire',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Garage',
        iconName: 'file-plus',
        route: '/ui-components/ListGarage',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Marque',
        iconName: 'file-plus',
        route: '/ui-components/ListMarque',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Modèle',
        iconName: 'file-plus',
        route: '/ui-components/ListModele',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Véhicule',
        iconName: 'file-plus',
        route: '/ui-components/SupprimerC4',
        roles: ['Admin', 'Agent'],
      },
    ],
  },

  //-------------------------------Fin Gestion-----------
  //------------------------------Paramètres------------
  {
    displayName: 'Paramètres',
    iconName: 'article',
    roles: ['Admin', 'Agent'],
    children: [
      {
        displayName: 'Destination',
        iconName: 'file-search',
        route: '/ui-components/ListDestination',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Enumération',
        iconName: 'report-medical',
        route: '/ui-components/ListEnumeration',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Périmètre',
        iconName: 'file-plus',
        route: '/ui-components/SupprimerC',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Statut',
        iconName: 'file-plus',
        route: '/ui-components/ListStatut',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Structure',
        iconName: 'file-plus',
        route: '/ui-components/ListStructure',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Type Carburant',
        iconName: 'file-plus',
        route: '/ui-components/ListTCarburant',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Type Véhicule',
        iconName: 'file-plus',
        route: '/ui-components/ListCatVehicule',
        roles: ['Admin', 'Agent'],
      },
      {
        displayName: 'Type Intervention',
        iconName: 'file-plus',
        route: '/ui-components/ListTIntervention',
        roles: ['Admin', 'Agent'],
      },
    ],
  },
  //------------------------------Fin Paramètres--------------------
  //-----------------------------Editions-------------------------------

  {
    displayName: 'Editions',
    iconName: 'article',
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
  //-----------------------------Fin Editions-------------------------------
  //------------------------------Rapports & Statistiques------------

  {
    displayName: 'Rapports & Statistiques',
    iconName: 'article',
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
