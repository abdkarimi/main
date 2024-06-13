import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsupprimerComponent } from './usupprimer.component';

describe('UsupprimerComponent', () => {
  let component: UsupprimerComponent;
  let fixture: ComponentFixture<UsupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsupprimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
