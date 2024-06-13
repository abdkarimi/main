import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsupprimerComponent } from './csupprimer.component';

describe('CsupprimerComponent', () => {
  let component: CsupprimerComponent;
  let fixture: ComponentFixture<CsupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsupprimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
