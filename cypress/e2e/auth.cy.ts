/// <reference types="cypress" />

import { Auth } from 'cypress/support/page-objects/auth';
import { ChooseShelterSelectors } from 'cypress/support/selectors/choose-shelter-selectors';

const auth = new Auth();

describe('Authentication', (): void => {
  before(() => {
    cy.visit('http://localhost:4200/#/auth-view');
  });

  it('should login and choose first avaiable shelter shelter', () => {
    auth.autentication();
    cy.get(ChooseShelterSelectors.sheltersItem).first().click();
  });
});
