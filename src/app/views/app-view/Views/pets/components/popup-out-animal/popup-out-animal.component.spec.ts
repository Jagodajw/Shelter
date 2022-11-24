import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOutAnimalComponent } from './popup-out-animal.component';

describe('PopupOutAnimalComponent', () => {
  let component: PopupOutAnimalComponent;
  let fixture: ComponentFixture<PopupOutAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupOutAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupOutAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
