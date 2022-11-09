export interface ShelterCard {
  type: Shelter;
  img: string;
}

export enum Shelter {
  otoz = 'OTOZ',
  tychy = 'TYCHY',
}

export const cardList: ShelterCard[] = [
  {
    type: Shelter.otoz,
    img: 'https://otoz.pl/wp-content/themes/otoz/images/otoz-animals.png',
  },
  {
    type: Shelter.tychy,
    img: 'https://otoz.pl/wp-content/themes/otoz/images/otoz-animals.png',
  },
];
