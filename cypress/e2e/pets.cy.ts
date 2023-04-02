/// <reference types="cypress" />

import { AuthViewSelectors } from 'cypress/support/selectors/auth-view-selectors';
import { PetsSelectors } from 'cypress/support/selectors/pets-selectors';

describe('Pets module', (): void => {
  it('Choose shelter', () => {
    cy.get(PetsSelectors.addPetBtnSelector).click();
  });

  it('enter into add view', () => {
    cy.get(AuthViewSelectors.loginFieldSelector).type('admin');
    cy.get(AuthViewSelectors.passwordFieldSelector).type('admin');
    cy.get(AuthViewSelectors.submitBtnSelector).click();
  });
});
