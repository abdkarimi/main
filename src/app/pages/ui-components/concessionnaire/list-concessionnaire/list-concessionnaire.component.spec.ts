import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConcessionnaireComponent } from './list-concessionnaire.component';

describe('ListConcessionnaireComponent', () => {
  let component: ListConcessionnaireComponent;
  let fixture: ComponentFixture<ListConcessionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConcessionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConcessionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
