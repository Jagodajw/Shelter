import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPersonActionPopupComponent } from './data-person-action-popup.component';

describe('DataPersonActionPopupComponent', () => {
  let component: DataPersonActionPopupComponent;
  let fixture: ComponentFixture<DataPersonActionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPersonActionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPersonActionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
