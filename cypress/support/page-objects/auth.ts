import { AuthViewSelectors } from '../selectors/auth-view-selectors';

export class Auth {
  autentication(): void {
    cy.get(AuthViewSelectors.loginFieldSelector).type('admin');
    cy.get(AuthViewSelectors.passwordFieldSelector).type('admin');
    cy.get(AuthViewSelectors.submitBtnSelector).click();
    // cy.get(ChooseShelterSelectors.firstSheltersItem).first().click();
  }
}
