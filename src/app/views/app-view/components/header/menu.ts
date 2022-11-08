export interface iMenuInterface {
  name: string;
  route: string;
  icon: string;
  isExpanded?: boolean;
  isActive?: boolean;
}

export const navList = [
  {
    name: 'Zwierzęta',
    route: 'pets',
    icon: 'pets',
  },
  {
    name: 'Ludzie',
    route: 'people',
    icon: 'group',
  },
  {
    name: 'Statystyki',
    route: 'stats',
    icon: 'trending_up',
  },
  {
    name: 'Ustawienia',
    route: 'settings',
    icon: 'settings',
  },
  {
    name: 'Dokumenty',
    route: 'documentation',
    icon: 'folder_open',
  },
];
