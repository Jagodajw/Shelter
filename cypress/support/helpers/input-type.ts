export const chooseSelectOptionWith = (value: string, selectors: string) => {
  cy.get(selectors).click().get('mat-option').contains(value).click();
};

export const chooseFirstDate = (selectors: string) => {
  cy.get(selectors).click().get('td[role="gridcell"]').first().click();
};
