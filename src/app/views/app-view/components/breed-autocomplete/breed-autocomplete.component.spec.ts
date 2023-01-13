import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedAutocompleteComponent } from './breed-autocomplete.component';

describe('BreedAutocompleteComponent', () => {
  let component: BreedAutocompleteComponent;
  let fixture: ComponentFixture<BreedAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
