import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPetRegisterComponent } from './data-pet-register.component';

describe('DataPetRegisterComponent', () => {
  let component: DataPetRegisterComponent;
  let fixture: ComponentFixture<DataPetRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPetRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPetRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
