import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssuranceComponent } from './list-assurance.component';

describe('ListAssuranceComponent', () => {
  let component: ListAssuranceComponent;
  let fixture: ComponentFixture<ListAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
