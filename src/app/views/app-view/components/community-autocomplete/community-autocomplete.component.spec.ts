import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityAutocompleteComponent } from './community-autocomplete.component';

describe('CommunityAutocompleteComponent', () => {
  let component: CommunityAutocompleteComponent;
  let fixture: ComponentFixture<CommunityAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
