import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsupprimerComponent } from './asupprimer.component';

describe('AsupprimerComponent', () => {
  let component: AsupprimerComponent;
  let fixture: ComponentFixture<AsupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsupprimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
