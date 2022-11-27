import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDocumentComponent } from './drop-document.component';

describe('DropDocumentComponent', () => {
  let component: DropDocumentComponent;
  let fixture: ComponentFixture<DropDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
