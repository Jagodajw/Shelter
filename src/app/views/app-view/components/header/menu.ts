export interface iMenuInterface {
  name: string;
  route: string;
  icon: string;
  isExpanded?: boolean;
  isActive?: boolean;
}

export const navList = [
  {
    name: 'pets.title',
    route: 'pets',
    icon: 'pets',
  },
  {
    name: 'people.title',
    route: 'people',
    icon: 'group',
  },
  {
    name: 'stats.title',
    route: 'stats',
    icon: 'trending_up',
  },
  {
    name: 'setings.title',
    route: 'settings',
    icon: 'settings',
  },
  {
    name: 'document.title',
    route: 'documentation',
    icon: 'folder_open',
  },
];
