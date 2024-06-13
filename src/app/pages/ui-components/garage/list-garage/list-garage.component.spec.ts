import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGarageComponent } from './list-garage.component';

describe('ListGarageComponent', () => {
  let component: ListGarageComponent;
  let fixture: ComponentFixture<ListGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGarageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
