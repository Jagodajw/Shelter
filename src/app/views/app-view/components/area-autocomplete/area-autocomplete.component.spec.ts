import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAutocompleteComponent } from './area-autocomplete.component';

describe('AreaAutocompleteComponent', () => {
  let component: AreaAutocompleteComponent;
  let fixture: ComponentFixture<AreaAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
