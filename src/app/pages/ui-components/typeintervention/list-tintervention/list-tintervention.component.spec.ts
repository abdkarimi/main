import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTInterventionComponent } from './list-tintervention.component';

describe('ListTInterventionComponent', () => {
  let component: ListTInterventionComponent;
  let fixture: ComponentFixture<ListTInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTInterventionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
