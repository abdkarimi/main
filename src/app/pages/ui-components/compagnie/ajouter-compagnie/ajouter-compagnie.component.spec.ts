import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCompagnieComponent } from './ajouter-compagnie.component';

describe('AjouterCompagnieComponent', () => {
  let component: AjouterCompagnieComponent;
  let fixture: ComponentFixture<AjouterCompagnieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCompagnieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterCompagnieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
