/// <reference types="cypress" />

import {
  chooseFirstDate,
  chooseSelectOptionWith,
} from 'cypress/support/helpers/input-type';
import { Auth } from 'cypress/support/page-objects/auth';
import { ChooseShelterSelectors } from 'cypress/support/selectors/choose-shelter-selectors';
import { DataRegisterSelectors } from 'cypress/support/selectors/data-register.selectors';
import { PersonDonorSelectors } from 'cypress/support/selectors/person-donor-selectors';
import { PetRegisterSelectors } from 'cypress/support/selectors/pet-register-selectors';
import { PetsSelectors } from 'cypress/support/selectors/pets-selectors';

const auth = new Auth();

describe('Register pet', () => {
  it('should register pet', () => {
    cy.visit('http://localhost:4200/#/auth-view');
    auth.autentication();

    cy.get(ChooseShelterSelectors.sheltersItem).first().click();

    cy.get(PetsSelectors.addPetBtnSelector).click();
    cy.get(PetRegisterSelectors.nameField).type('Riki');
    cy.get(PetRegisterSelectors.speciesField).type('pies');
    cy.get(PetRegisterSelectors.breedField).type('kundel');
    cy.get(PetRegisterSelectors.communeField).type('Katowice');
    cy.get(PetRegisterSelectors.areaField).type('Centrum');
    cy.get(PetRegisterSelectors.colorField).type('Czarny');
    chooseSelectOptionWith('Średni', PetRegisterSelectors.sizeField);
    chooseSelectOptionWith('Samica', PetRegisterSelectors.genderField);
    cy.get(PetRegisterSelectors.nrChipField).type('123456789123434');
    chooseFirstDate(PetRegisterSelectors.dateOfBirthField);
    cy.get(PetRegisterSelectors.vaccinationField).click();
    chooseFirstDate(PetRegisterSelectors.dateVaccinationField);
    cy.get(PetRegisterSelectors.descriptionAnimalField).type('Brak');

    cy.get(PersonDonorSelectors.nameField).type('Jan Kowalski');
    cy.get(PersonDonorSelectors.idNumberField).type('AS1233333');
    cy.get(PersonDonorSelectors.peselField).type('98052394534');
    cy.get(PersonDonorSelectors.emailField).type('jan.kowalski@mail.com');
    cy.get(PersonDonorSelectors.telephoneField).type('564345678');
    cy.get(PersonDonorSelectors.addressField).type('Krakowska');
    cy.get(PersonDonorSelectors.cityField).type('Katowice');
    cy.get(PersonDonorSelectors.zipCodeField).type('40-000');
    cy.get(PersonDonorSelectors.communeField).type('Murcki');
    chooseSelectOptionWith('Śląsk', PersonDonorSelectors.provinceField);
    cy.get(PersonDonorSelectors.descriptionField).type('Opis');

    cy.get(DataRegisterSelectors.typeOfAcceptanceField).type('Pilne');
    cy.get(DataRegisterSelectors.introducedEmployeesField).type('Tomasz Nowak');
    cy.get(DataRegisterSelectors.acceptedEmployeesField).type('Andrzej Kruk');
    cy.get(DataRegisterSelectors.commentsRegisterField).type('-');

    cy.get(PetsSelectors.addRegisterBtnSelector).click();
  });
});
