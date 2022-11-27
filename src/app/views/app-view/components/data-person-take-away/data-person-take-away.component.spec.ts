import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPersonTakeAwayComponent } from './data-person-take-away.component';

describe('DataPersonTakeAwayComponent', () => {
  let component: DataPersonTakeAwayComponent;
  let fixture: ComponentFixture<DataPersonTakeAwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPersonTakeAwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPersonTakeAwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
