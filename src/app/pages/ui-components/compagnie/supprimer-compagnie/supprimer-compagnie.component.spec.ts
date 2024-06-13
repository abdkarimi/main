import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerCompagnieComponent } from './supprimer-compagnie.component';

describe('SupprimerCompagnieComponent', () => {
  let component: SupprimerCompagnieComponent;
  let fixture: ComponentFixture<SupprimerCompagnieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerCompagnieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerCompagnieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
