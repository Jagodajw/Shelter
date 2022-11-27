import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPetOutComponent } from './data-pet-out.component';

describe('DataPetOutComponent', () => {
  let component: DataPetOutComponent;
  let fixture: ComponentFixture<DataPetOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPetOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPetOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
