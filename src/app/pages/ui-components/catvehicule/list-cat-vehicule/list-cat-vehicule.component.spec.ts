import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatVehiculeComponent } from './list-cat-vehicule.component';

describe('ListCatVehiculeComponent', () => {
  let component: ListCatVehiculeComponent;
  let fixture: ComponentFixture<ListCatVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCatVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCatVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
