import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorAutocompleteComponent } from './color-autocomplete.component';

describe('ColorAutocompleteComponent', () => {
  let component: ColorAutocompleteComponent;
  let fixture: ComponentFixture<ColorAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
