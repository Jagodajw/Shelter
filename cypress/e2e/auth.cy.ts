/// <reference types="cypress" />

import { AuthViewSelectors } from 'cypress/support/selectors/auth-view-selectors';

describe('Login page', (): void => {
  before(() => {
    cy.visit('http://localhost:4200/#/auth-view');
  }),
    it('should login', () => {
      cy.get(AuthViewSelectors.loginFieldSelector).type('admin');
      cy.get(AuthViewSelectors.passwordFieldSelector).type('admin');
      cy.get(AuthViewSelectors.submitBtnSelector).click();
    });
});
