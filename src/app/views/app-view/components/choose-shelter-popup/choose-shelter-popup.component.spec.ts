import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseShelterPopupComponenet } from './choose-shelter-popup.componenet';

describe('ChooseShelterPopupComponenet', () => {
  let component: ChooseShelterPopupComponenet;
  let fixture: ComponentFixture<ChooseShelterPopupComponenet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseShelterPopupComponenet],
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseShelterPopupComponenet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
