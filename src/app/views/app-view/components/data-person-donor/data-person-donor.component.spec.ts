import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPersonDonorComponent } from './data-person-donor.component';

describe('DataPersonDonorComponent', () => {
  let component: DataPersonDonorComponent;
  let fixture: ComponentFixture<DataPersonDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPersonDonorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPersonDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
